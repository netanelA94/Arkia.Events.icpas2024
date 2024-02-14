<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ErrorPaymentGNR04.aspx.cs" Inherits="Arkia.Events.LC2014.UI.GNR04" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div id="RGS04" class="orangeHeader pieFix" role="heading" aria-level="2">
        <asp:Literal ID="ltrTitle" runat="server"></asp:Literal>
        </div>
    <div id="main" class="mainContentBox pieFix">
        <div>
            <div class="errorTitle newLine"><asp:Literal ID="ltrTextMarketingTitle" runat="server"></asp:Literal></div>
            <div class="errorTextMarketing"><asp:Literal ID="ltrTextMarketing" runat="server"></asp:Literal></div>
        </div>
        <asp:HyperLink ID="hlPayment" CssClass="errorlink" runat="server"></asp:HyperLink>
    </div>
</asp:Content>
