import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/logout")
public class LogoutServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse res)
            throws ServletException, IOException {
                res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

                res.setHeader("Access-Control-Allow-Credentials", "true");
                
                res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
                
                res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, Accept, X-Requested-With");
        
                res.setHeader("Access-Control-Max-Age", "3600");
      
        request.getSession().invalidate();
       
      
        res.setContentType("application/json");
        res.getWriter().write("{\"success\": true}");
    }
}
