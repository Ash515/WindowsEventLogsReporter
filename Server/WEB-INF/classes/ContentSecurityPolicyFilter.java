import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

public class ContentSecurityPolicyFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        httpResponse.setHeader("Content-Security-Policy", "default-src 'self'; connect-src 'self' http://localhost:8080 ws://localhost:8080 ws://localhost:49152 ws://0.0.0.0:49152;");
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
    }
}
