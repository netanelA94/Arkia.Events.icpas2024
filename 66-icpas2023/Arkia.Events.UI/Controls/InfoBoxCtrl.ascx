<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="InfoBoxCtrl.ascx.cs"
    Inherits="Arkia.Events.LC2014.UI.Controls.InfoBoxCtrl" %>
<div id="infoBoxDiv" runat="server" class="infoBox pieFix">
    <div class="infoBoxBubble">
    </div>
    <asp:ListView runat="server" ID="lvInfoBox">
        <LayoutTemplate>
            <ul>
                <asp:PlaceHolder ID="itemPlaceHolder" runat="server"></asp:PlaceHolder>
            </ul>
        </LayoutTemplate>
        <ItemTemplate>
            <li>
                <%#Container.DataItem%></li>
        </ItemTemplate>
    </asp:ListView>
</div>
