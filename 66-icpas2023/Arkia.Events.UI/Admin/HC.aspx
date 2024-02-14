<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="HC.aspx.cs" Inherits="Arkia.Events.LC2014.UI.Admin.HC" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Health Check</title>
    <meta name="robots" id="robots"  content="noindex,nofollow" />
</head>
<body>
    <form id="form1" runat="server">

  <h2>Health Check page</h2>
  <p>Using Port:<asp:Literal ID="ltlPort" runat="server"></asp:Literal></p>
  <p>On (server):<asp:Literal ID="ltlServer" runat="server"></asp:Literal></p>
  <p>From (client):<asp:Literal ID="ltlClient" runat="server"></asp:Literal></p>
  <p>SQL SERVER STATUS: <asp:Literal ID="ltlSql" runat="server"></asp:Literal></p>
  <p>ORACLE SERVER STATUS:<asp:Literal ID="ltlOracle" runat="server"></asp:Literal></p>


  </form>
</body>
</html>

