<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PopUpPage.aspx.cs" Inherits="Arkia.Events.LC2014.UI.PopUpPage" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server" dir="rtl">
    <div class="popupWrapper">
        <div class="orangeHeader">
            <asp:Literal ID="ltrTitle" runat="server"></asp:Literal>
        </div>
        <div class="mainContentBox">
            <asp:Literal ID="ltrContent" runat="server"></asp:Literal>
        </div>
    </div>
    </form>
</body>
</html>
