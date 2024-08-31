import org.elasticsearch.action.search.ClearScrollRequest;
import org.elasticsearch.action.search.ClearScrollResponse;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchScrollRequest;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortOrder;
import org.elasticsearch.transport.client.PreBuiltTransportClient;
import org.elasticsearch.common.unit.TimeValue;
import org.json.JSONArray;
import org.json.JSONObject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.InetAddress;
import com.google.gson.Gson;
import java.util.*;

@WebServlet("/fetchlogs")
public class FetchlogsfromES extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int page = 1; // Default page number
        int size = 10; // Default page size
        String searchTerm = request.getParameter("searchTerm");

        // Retrieve and validate 'page' parameter
        String pageParam = request.getParameter("page");
        if (pageParam != null && !pageParam.trim().isEmpty()) {
            try {
                page = Integer.parseInt(pageParam);
                if (page < 1) page = 1; // Ensure page is at least 1
            } catch (NumberFormatException e) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid page number: " + pageParam);
                return;
            }
        }

        String sizeParam = request.getParameter("size");
        if (sizeParam != null && !sizeParam.trim().isEmpty()) {
            try {
                size = Integer.parseInt(sizeParam);
                if (size < 1) size = 10; // Ensure size is at least 1
            } catch (NumberFormatException e) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid page size: " + sizeParam);
                return;
            }
        }
        if (size <= 0) {
            size = 10;
        }

        try (TransportClient client = new PreBuiltTransportClient(Settings.builder().put("cluster.name", "elasticsearch").build())
                .addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("localhost"), 9300))) {

            
            BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();

            if (searchTerm != null && !searchTerm.isEmpty()) {
                if (isNumeric(searchTerm)) {
                    // Apply numeric queries to numeric fields
                    boolQuery.should(QueryBuilders.termQuery("EventCode", searchTerm))
                             .should(QueryBuilders.termQuery("TimeGenerated", searchTerm));
                } else {
                    // Apply string queries to string fields
                    boolQuery.should(QueryBuilders.matchQuery("Type", searchTerm))
                             .should(QueryBuilders.matchQuery("Logfile", searchTerm))
                             .should(QueryBuilders.matchQuery("SourceName", searchTerm));
                }
            } else {
                boolQuery.must(QueryBuilders.matchAllQuery());
            }

            SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
            sourceBuilder.query(boolQuery);
            sourceBuilder.from((page - 1) * size);
            sourceBuilder.size(size);

            SearchRequest searchRequest = new SearchRequest("log-*");
            searchRequest.source(sourceBuilder);

            SearchResponse searchResponse = client.search(searchRequest).actionGet();

            long totalRecords = searchResponse.getHits().getTotalHits();

            StringBuilder responseBuilder = new StringBuilder();
            responseBuilder.append("{\"totalRecords\":").append(totalRecords).append(",\"logs\":[");

            for (SearchHit hit : searchResponse.getHits().getHits()) {
                responseBuilder.append(new Gson().toJson(hit.getSourceAsMap())).append(",");
            }
            if (responseBuilder.length() > "{\"totalRecords\":".length()) {
                responseBuilder.setLength(responseBuilder.length() - 1); // Remove last comma
            }
            responseBuilder.append("]}");

            response.setContentType("application/json");
            PrintWriter out = response.getWriter();
            out.print(responseBuilder.toString());
            out.flush();
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error processing request: " + e.getMessage());
        }
    }


    private boolean isNumeric(String str) {
        try {
            Double.parseDouble(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
