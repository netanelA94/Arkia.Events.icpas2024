<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="SignInRGS01.aspx.cs" Inherits="Arkia.Events.LC2014.UI.RGS01" %>
<%@ Register Src="~/Controls/InfoBoxCtrl.ascx" TagName="InfoBoxCtrl" TagPrefix="Arkia" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="actionBar">
        <div class="msgBox msgBoxOuter hiddenClass pie col-sm-12 col-xs-12">
            <a href="#" class="close" role="button">X</a>
            <div class="errorFlag">
            </div>
            <div class="content">
            </div>
        </div>
    </div>
    <div id="RGS01" class="orangeHeader pieFix" role="heading" aria-level="2">
        <asp:Literal ID="ltrTitle" runat="server"></asp:Literal>
    </div>
    <div id="main" class="mainContentBox pieFix sign">
        <div class="loginWrapper col-sm-12 col-xs-12">
            <div class="row col-sm-12 col-xs-12">
                <div class="loginValidation" role="alert" >
                    <asp:Label ID="lblLoginError" runat="server" Visible="false"></asp:Label>
                </div>
            </div>
            <div class="row col-sm-12 col-xs-12">
                <asp:TextBox ID="txtID" runat="server" class="txtLogin" aria-describedby="lblId" aria-required="true" pattern="[0-9]{9}" title="תעודת זהות" maxlength="9" required></asp:TextBox>
                <h4 id="lblId" role="presentation"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS01_ID%>"/></h4>
            </div>
            <%--<div class="row col-sm-12 col-xs-12">
                <asp:TextBox ID="txtLicense" runat="server" class="txtLogin" aria-describedby="lblLicense" aria-required="true" required></asp:TextBox>
                <h4 id="lblLicense" role="presentation"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS01_License%>"/></h4>
            </div>--%>

                        <div class="row col-sm-12 col-xs-12">
                <h4>תאריך לידה</h4>

                <select runat="server" id="ddlYears" role="CUSTOMER_YEAR" class="input dateSelect ddlYears">
                    <option value="">שנה</option>
                </select>&nbsp&nbsp&nbsp
                <select id="ddlMonthes" runat="server" role="CUSTOMER_MONTH" class="input dateSelect ddlMonthes">
                    <option value="">חודש</option>
                </select>&nbsp&nbsp&nbsp
                <select id="ddlDays" runat="server" role="CUSTOMER_DAY" class="input dateSelect ddlDays">
                    <option value="">יום</option>
                </select>
            </div>

        </div>
        <div class="marketingTextBox col-sm-12 col-xs-12">
            <div class="newLine">
                <span class="title">
                    <asp:Literal ID="ltrTextMarketingTitle" runat="server"></asp:Literal></span>
            </div>
            <asp:Literal ID="ltrTextMarketing" runat="server"></asp:Literal>
        </div>
    </div>

    <ul id="linkCatalog" runat="server" class="linkCatalog">
        <li><a id="hlCatalog" target="_blank" runat="server"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS01_Catalog%>"/></a> </li>
        <li class="blueArrow"></li>
    </ul>
    <asp:LinkButton ID="btnContinue" class="btnContinue pieFix" runat="server" OnClick="btnContinue_Click" role="button">
        <%--<div class="btnContinue pieFix">--%>
            <div class="btnContinueInner">
                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , ContinuButton%>"/></div>
            <div id="btnContinueText" runat="server" class="btnContinueText"></div>
        <%--</div>--%>
    </asp:LinkButton>
    <div class="clear">
    </div>
     <asp:HiddenField ID="hfDob" runat="server" />
</asp:Content>
