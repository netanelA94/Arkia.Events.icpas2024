<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ClearCache.aspx.cs" Inherits="Arkia.Events.LC2014.UI.ClearCache" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div class="wrapper" style="direction: ltr;">
    <br />
        <div id="loginDiv" runat="server" visible="true" style="float: left">
            user name:
            <asp:TextBox ID="txtUserName" runat="server" MaxLength="20"></asp:TextBox>
            password:
            <asp:TextBox ID="txtPassword" runat="server" TextMode="Password" MaxLength="20" style="height: 28px;line-height: 28px;"></asp:TextBox>
            <asp:Button ID="login" runat="server" Text="Login" OnClick="btnLogin_Click" />
        </div>
        <div id="contentDiv" runat="server" visible="false">
            <div align="center">
                <asp:Button ID="btnShowCache" runat="server" Text="Show Cache" Width="200px" OnClick="btnShowCache_Click" />
                <asp:Button ID="btnClearCache" runat="server" Text="Clear Cache" Width="200px" OnClick="btnClearCache_Click" />
                <asp:Button ID="btnClearAllPools" runat="server" Text="Clear Pools" Width="200px"
                    OnClick="btnClearAllPools_Click" />
            </div>
            <div id="treeCache" runat="server" visible="false">
                <br />
                <br />
                <strong>
                    <asp:Label ID="lblSumCache" runat="server" CssClass="floatLeft" Style="padding: 10px 10px"></asp:Label></strong>
                <br />
                <br />
                <asp:ListView ID="lvCache" runat="server" OnItemDataBound="lvCache_ItemDataBound">
                    <LayoutTemplate>
                        <ul>
                            <asp:PlaceHolder ID="itemPlaceHolder" runat="server"></asp:PlaceHolder>
                        </ul>
                    </LayoutTemplate>
                    <ItemTemplate>
                        <li style="padding: 10px 3px">
                            <div style="width: 35px" class="floatLeft">
                                <%# (Container.DataItemIndex + 1).ToString() %>
                                -
                            </div>
                            <div style="min-width: 200px; margin-right: 10px;" class="floatLeft">
                                <asp:Literal ID="ltrChaceKey" runat="server"></asp:Literal></div>
                            <div class="floatLeft">
                                <asp:Literal ID="ltrChacevalue" runat="server"></asp:Literal></div>
                        </li>
                    </ItemTemplate>
                </asp:ListView>
            </div>
        </div>
    </div>
    </form>
</body>
</html>
