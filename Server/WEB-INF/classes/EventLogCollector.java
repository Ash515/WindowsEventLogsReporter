import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.transport.client.PreBuiltTransportClient;

import java.net.InetAddress;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class EventLogCollector {

    static {
        System.loadLibrary("EventLogCollector");
    }

    public native ArrayList<Map<String, Object>> collectAllLogs();
}

//     // Native method returns ArrayList<Map<String, Object>>


//     // Convert TimeGenerated string to Unix timestamp in milliseconds
//     private static long convertTimeGeneratedToMillis(String timeGenerated) {
//         try {
//             SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss.SSSSSS");
//             Date date = dateFormat.parse(timeGenerated.substring(0, 14) + "." + timeGenerated.substring(15, 21));
//             return date.getTime();
//         } catch (ParseException e) {
//             e.printStackTrace();
//             return 0; // Default to 0 if parsing fails
//         }
//     }

//     // Convert EventCode to integer
//     private static int convertEventCodeToInt(String eventCode) {
//         try {
//             return Integer.parseInt(eventCode);
//         } catch (NumberFormatException e) {
//             e.printStackTrace();
//             return 0; // Default to 0 if parsing fails
//         }
//     }

//     // Convert Unix timestamp in milliseconds to human-readable format
//     private static String convertMillisToHumanReadable(long millis) {
//         SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
//         Date date = new Date(millis);
//         return sdf.format(date);
//     }

//     public static void main(String[] args) {
//         try {
//             EventLogCollector collector = new EventLogCollector();
//             ArrayList<Map<String, Object>> logs = collector.collectAllLogs();

//             // Create Elasticsearch client
//             try (TransportClient client = new PreBuiltTransportClient(org.elasticsearch.common.settings.Settings.EMPTY)
//                     .addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName("localhost"), 9300))) {

//                 // Prepare bulk request
//                 BulkRequest bulkRequest = new BulkRequest();

//                 for (Map<String, Object> log : logs) {
//                     // Convert and update the log entry
//                     String eventCodeStr = (String) log.get("EventCode");
//                     String timeGeneratedStr = (String) log.get("TimeGenerated");

//                     int eventCodeInt = convertEventCodeToInt(eventCodeStr);
//                     long timeGeneratedMillis = convertTimeGeneratedToMillis(timeGeneratedStr);
//                     String humanReadableDate = convertMillisToHumanReadable(timeGeneratedMillis);

//                     log.put("EventCode", eventCodeInt);
//                     log.put("TimeGenerated", timeGeneratedMillis);
//                     log.put("TimeGeneratedHumanReadable", humanReadableDate);

//                     // Add the log entry to the bulk request
//                     IndexRequest request = new IndexRequest("log360", "doc")
//                             .source(log, XContentType.JSON);
//                     bulkRequest.add(request);
//                 }

//                 // Execute the bulk request
//                 BulkResponse bulkResponse = client.bulk(bulkRequest).actionGet();
//                 if (bulkResponse.hasFailures()) {
//                     // Log failures
//                     System.err.println("Bulk indexing failed: " + bulkResponse.buildFailureMessage());
//                 }
//             }
//         } catch (Exception e) {
//             // Handle exceptions
//             System.err.println("Error in EventLogCollector: " + e.getMessage());
//         }
//     }
// }
