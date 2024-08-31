//version 1

// import javax.servlet.ServletException;
// import javax.servlet.annotation.WebServlet;
// import javax.servlet.http.HttpServlet;
// import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpServletResponse;
// import java.io.IOException;
// import java.io.PrintWriter;
// import org.elasticsearch.action.search.SearchResponse;
// import org.elasticsearch.client.transport.TransportClient;
// import org.elasticsearch.common.settings.Settings;
// import org.elasticsearch.common.transport.InetSocketTransportAddress;
// import org.elasticsearch.transport.client.PreBuiltTransportClient;
// import org.elasticsearch.search.aggregations.AggregationBuilders;
// import org.elasticsearch.search.aggregations.bucket.terms.Terms;

// import java.net.InetAddress;
// import java.net.UnknownHostException;

// @WebServlet("/eventlogs/logtypecounts")
// public class LogTypeCounts extends HttpServlet {
//     private TransportClient client;

//     @Override
//     public void init() throws ServletException {
//         super.init();
//         try {
        
//             Settings settings = Settings.builder()
//                     .put("cluster.name", "elasticsearch") 
//                     .build();
            
            
//             client = new PreBuiltTransportClient(settings)
//                     .addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("localhost"), 9300)); // Replace with your ES host and port
//         } catch (UnknownHostException e) {
//             throw new ServletException("Failed to connect to Elasticsearch server", e);
//         }
//     }

//     @Override
//     protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
//         resp.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
//         resp.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//         resp.setHeader("Access-Control-Allow-Headers", "Content-Type");

//         // ESsearch request to get the aggregation of log types
//         SearchResponse response = client.prepareSearch("log360")
//                 .setSize(0) // We don't need actual documents, just the counts
//                 .addAggregation(
//                         AggregationBuilders.terms("logTypes").field("logtype.keyword")
//                 )
//                 .get();

        
//         Terms logTypes = response.getAggregations().get("logTypes");

       
//         resp.setContentType("application/json");
//         PrintWriter out = resp.getWriter();
        
//         out.print("{");

       
//         boolean first = true;
        
//         for (Terms.Bucket bucket : logTypes.getBuckets()) {
//             if (!first) {
//                 out.print(",");
//             }
//             out.print("\"" + bucket.getKeyAsString().toLowerCase() + "\": " + bucket.getDocCount());
//             first = false;
//         }
//         out.print("}");

//         out.close();
//     }

//     @Override
//     public void destroy() {
//         if (client != null) {
//             client.close();
//         }
//         super.destroy();
//     }
// }



//version 2
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.transport.client.PreBuiltTransportClient;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;

import java.net.InetAddress;
import java.net.UnknownHostException;

@WebServlet("/logtypecounts")
public class LogTypeCounts extends HttpServlet {
    private TransportClient client;

    @Override
    public void init() throws ServletException {

        
        super.init();
        try {
            Settings settings = Settings.builder()
                    .put("cluster.name", "elasticsearch") 
                    .build();
            
            client = new PreBuiltTransportClient(settings)
                    .addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("localhost"), 9300)); // Replace with your ES host and port
        } catch (UnknownHostException e) {
            throw new ServletException("Failed to connect to Elasticsearch server", e);
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
         // session validation
         if (req.getSession(false) == null || req.getSession().getAttribute("authenticated") == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\": \"Unauthorized access\"}");
            return;
        }
        
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");

        // ES search request to get the aggregation of log types
        SearchResponse response = client.prepareSearch("log-*") 
                .setSize(0) 
                .addAggregation(
                        AggregationBuilders.terms("Logfile").field("Logfile.keyword")
                )
                .get();

        Terms logTypes = response.getAggregations().get("Logfile");

        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();
        
        out.print("{");

        boolean first = true;

        for (Terms.Bucket bucket : logTypes.getBuckets()) {
            if (!first) {
                out.print(",");
            }
            out.print("\"" + bucket.getKeyAsString().toLowerCase() + "\": " + bucket.getDocCount());
            first = false;
        }
        out.print("}");

        out.close();
    }

    @Override
    public void destroy() {
        if (client != null) {
            client.close();
        }
        super.destroy();
    }
}
