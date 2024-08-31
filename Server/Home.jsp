<%@ page session="true" %>
<%
    
    session.setAttribute("authenticated", true);
%>

<!DOCTYPE html>
<html>
<head>
    <title>Home</title>
</head>
<body>
    <h1>Welcome User</h1>
    <a href="<%= request.getContextPath() %>/out">Logout</a>
</body>
</html>
