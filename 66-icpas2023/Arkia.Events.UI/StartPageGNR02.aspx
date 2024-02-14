<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="StartPageGNR02.aspx.cs" Inherits="Arkia.Events.LC2014.UI.GNR02" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div id="main" class="mainGreetings pieFix col-sm-12 col-xs-12">
        <h1 class="title" aria-level="2">
            <asp:Label ID="lblHomepageGreeting" runat="server" /></h1>
        <h3 role="presentation">
            <asp:Literal ID="ltrTextMarketing" runat="server"></asp:Literal></h3>
    </div>
    <asp:HyperLink ID="hlContinue" class="btnContinue pieFix" runat="server">
        <%--<div class="btnContinue pieFix">--%>
            <div class="btnContinueInner"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , ContinuButton%>"/></div>
            <div id="btnContinueText" runat="server" class="btnContinueText"></div>
        <%--</div>--%>
    </asp:HyperLink>
    <div class="clear">
    </div>
</asp:Content>
