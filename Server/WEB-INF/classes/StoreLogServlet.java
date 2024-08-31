import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import org.elasticsearch.action.bulk.BulkRequestBuilder;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.transport.client.PreBuiltTransportClient;

import java.net.InetAddress;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.*;

public class StoreLogServlet extends HttpServlet {

    private TransportClient client;
    private EventLogCollector collector;
    private ScheduledExecutorService scheduler;
    private String currentIndex;

    private static final int BULK_UPLOAD_INTERVAL_SECONDS = 10;  // Bulk upload interval
    private static final int INDEX_CREATION_INTERVAL_MINUTES = 30;  // Index creation interval

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);

        try {
            Settings settings = Settings.builder()
                    .put("cluster.name", "elasticsearch").build();
            client = new PreBuiltTransportClient(settings)
                    .addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("127.0.0.1"), 9300));

            // Initialize JNI event log collector
            collector = new EventLogCollector();

            // Initialize scheduler
            scheduler = Executors.newScheduledThreadPool(2);

            // Start bulk update task
            scheduler.scheduleAtFixedRate(() -> {
                try {
                    bulkUpdateLogs();
                } catch (Exception e) {
                    System.err.println("Error during bulk update: " + e.getMessage());
                    e.printStackTrace();
                }
            }, 0, BULK_UPLOAD_INTERVAL_SECONDS, TimeUnit.SECONDS);

            // Start index creation task
            scheduler.scheduleAtFixedRate(() -> {
                try {
                    createNewIndex();
                } catch (Exception e) {
                    System.err.println("Error during index creation: " + e.getMessage());
                    e.printStackTrace();
                }
            }, 0, INDEX_CREATION_INTERVAL_MINUTES, TimeUnit.MINUTES);

        } catch (Exception e) {
            throw new ServletException("Failed to initialize LogServlet", e);
        }
    }

    @Override
    public void destroy() {
        shutdownScheduler();
        closeClient();
        super.destroy();
    }

    private static long convertTimeGeneratedToMillis(String timeGenerated) {
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss.SSSSSS");
            Date date = dateFormat.parse(timeGenerated.substring(0, 14) + "." + timeGenerated.substring(15, 21));
            return date.getTime();
        } catch (ParseException e) {
            e.printStackTrace();
            return 0; // Default to 0 if parsing fails
        }
    }

    // Convert EventCode to integer
    private static int convertEventCodeToInt(String eventCode) {
        try {
            return Integer.parseInt(eventCode);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return 0; // Default to 0 if parsing fails
        }
    }

    // Convert Unix timestamp in milliseconds to human-readable format
    private static String convertMillisToHumanReadable(long millis) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        Date date = new Date(millis);
        return sdf.format(date);
    }

    private void bulkUpdateLogs() throws Exception {
        List<Map<String, Object>> logsFromJNI = collector.collectAllLogs(); // Collect logs from JNI
        
        if (logsFromJNI.isEmpty()) {
            return;
        }

        BulkRequestBuilder bulkRequest = client.prepareBulk();
        for (Map<String, Object> logData : logsFromJNI) {
            String eventCodeStr = (String) logData.get("EventCode");
            String timeGeneratedStr = (String) logData.get("TimeGenerated");

            int eventCodeInt = convertEventCodeToInt(eventCodeStr);
            long timeGeneratedMillis = convertTimeGeneratedToMillis(timeGeneratedStr);
            String humanReadableDate = convertMillisToHumanReadable(timeGeneratedMillis);

            logData.put("EventCode", eventCodeInt);
            logData.put("TimeGenerated", timeGeneratedMillis);
            logData.put("TimeGeneratedHumanReadable", humanReadableDate);

            IndexRequest indexRequest = new IndexRequest(currentIndex, "doc").source(logData, XContentType.JSON);
            bulkRequest.add(indexRequest);
        }

        BulkResponse bulkResponse = bulkRequest.get();
        if (bulkResponse.hasFailures()) {
            System.err.println("Bulk update had failures: " + bulkResponse.buildFailureMessage());
        }
    }

    private void createNewIndex() throws Exception {
        currentIndex = "log-" + System.currentTimeMillis();
        // Optionally add index creation logic if needed
        System.out.println("Created new index: " + currentIndex);
    }

    private void shutdownScheduler() {
        if (scheduler != null && !scheduler.isShutdown()) {
            scheduler.shutdown();
            try {
                // Wait for existing tasks to terminate
                if (!scheduler.awaitTermination(30, TimeUnit.SECONDS)) {
                    scheduler.shutdownNow(); // Force shutdown if tasks don't terminate
                }
            } catch (InterruptedException e) {
                scheduler.shutdownNow(); // (Re-)Cancel if current thread also interrupted
                Thread.currentThread().interrupt();
            }
        }
    }

    private void closeClient() {
        if (client != null) {
            try {
                client.close();
            } catch (Exception e) {
                System.err.println("Error closing Elasticsearch client: " + e.getMessage());
                e.printStackTrace();
            }
        }
    }
}
