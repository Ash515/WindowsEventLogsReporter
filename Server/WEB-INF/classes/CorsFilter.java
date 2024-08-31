import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter("/*")
public class CorsFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletResponse res = (HttpServletResponse) response;
        HttpServletRequest req = (HttpServletRequest) request;

        // Allow requests from the Ember.js app
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        
        // Allow credentials (cookies, authorization headers, etc.)
        res.setHeader("Access-Control-Allow-Credentials", "true");
        
        // Allow specific HTTP methods
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        
        // Allow specific HTTP headers
        res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, Accept, X-Requested-With");

        // Preflight cache duration
        res.setHeader("Access-Control-Max-Age", "3600");

        // Handle preflight request (OPTIONS method)
        if ("OPTIONS".equalsIgnoreCase(req.getMethod())) {
            res.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        // Pass the request along the filter chain
        chain.doFilter(request, response);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Any filter initialization code goes here
    }

    @Override
    public void destroy() {
        // Any filter destruction code goes here
    }
}
