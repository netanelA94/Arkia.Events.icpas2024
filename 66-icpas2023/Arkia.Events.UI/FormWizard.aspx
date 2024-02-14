<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="FormWizard.aspx.cs" Inherits="Arkia.Events.LC2014.UI.FormWizard" %>

<%@ Register Src="~/Controls/DetailsRGS03.ascx" TagName="RGS03" TagPrefix="Arkia" %>
<%@ Register Src="~/Controls/AccompaniedRGS04.ascx" TagName="RGS04" TagPrefix="Arkia" %>
<%@ Register Src="~/Controls/FeesRGS05.ascx" TagName="RGS05" TagPrefix="Arkia" %>
<%@ Register Src="~/Controls/HotelsPRD01.ascx" TagName="PRD01" TagPrefix="Arkia" %>
<%@ Register Src="~/Controls/HotelsPRD02.ascx" TagName="PRD02" TagPrefix="Arkia" %>
<%@ Register Src="~/Controls/FlightsPRD03.ascx" TagName="PRD03" TagPrefix="Arkia" %>
<%@ Register Src="~/Controls/FlightsPRD04.ascx" TagName="PRD04" TagPrefix="Arkia" %>
<%@ Register Src="~/Controls/MealsPRD13.ascx" TagName="MealsPRD13" TagPrefix="Arkia" %>
<%@ Register Src="~/Controls/ProductsPRD05.ascx" TagName="PRD05" TagPrefix="Arkia" %>
<%@ Register Src="~/Controls/ProductsPRD06.ascx" TagName="PRD06" TagPrefix="Arkia" %>
<%@ Register Src="~/Controls/ProductsPRD07.ascx" TagName="PRD07" TagPrefix="Arkia" %>
<%@ Register Src="~/Controls/SummaryPMN01.ascx" TagName="PMN01" TagPrefix="Arkia" %>
<%@ Register Src="~/Controls/ShuttlePRD09.ascx" TagName="ShuttlePRD09" TagPrefix="Arkia" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%----------------------------------------------------------------------------Scripts-----------------------------------------------------------------%>
    <script src="JS/plugins/smartWizard/jquery.smartWizard-2.0.js" type="text/javascript"></script>
    <script src="JS/libs/angular.min.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Smart Wizard -->
    <div id="wizard" runat="server">
    <div ng-app id="wizard" ng-controller="ARKIA.WIZARD.wizardCtrl"  data-ng-init="init()" class="swMain col-sm-12 col-xs-12">
        <ul id="menu" >
             <li><a data-steppage="RGS03"><small class="floatRight">
                <asp:Literal ID="ltrStep1" runat="server"></asp:Literal></small><div class="separator"> 
                </div>
            </a></li> 
    <li><a data-steppage="RGS04"><small class="floatRight">
                <asp:Literal ID="ltrStep2" runat="server"></asp:Literal></small><div class="separator">
                </div>
            </a></li>    
            <li><a data-steppage="RGS05"><small class="floatRight">
                <asp:Literal ID="ltrStep3" runat="server"></asp:Literal></small><div class="separator">
                </div>
            </a></li>
            <li><a data-steppage="PRD01"><small class="floatRight">
                <asp:Literal ID="ltrStep4" runat="server"></asp:Literal></small><div class="separator">
                </div>
            </a></li>
            <li><a data-steppage="PRD03"><small class="floatRight">
                <asp:Literal ID="ltrStep5" runat="server"></asp:Literal></small><div class="separator">
                </div>
            </a></li>
            <%--<li><a data-steppage="PRD09"><small class="floatRight">
                <asp:Literal ID="ltrStep10" runat="server"></asp:Literal></small><div class="separator">
                </div>
            </a></li>--%>
              <%-- MealsPRD13--%>
           <%--<li><a data-steppage="PRD13"><small class="floatRight">
                <asp:Literal ID="ltrStep13" runat="server"></asp:Literal></small><div class="separator">
                </div>
            </a></li>--%>
            <li><a data-steppage="PRD05"><small class="floatRight">
                <asp:Literal ID="ltrStep6" runat="server"></asp:Literal></small><div class="separator">
                </div>
            </a></li>
         <%-- <li><a data-steppage="PRD06"><small class="floatRight">
                <asp:Literal ID="ltrStep7" runat="server"></asp:Literal></small><div class="separator">
                </div>
            </a></li>--%>
            <%-- <li><a  data-stepPage="PRD07"><small class="floatRight">
                <asp:Literal ID="ltrStep8" runat="server"></asp:Literal></small><div class="separator">
                </div>
            </a></li>--%>
            <li><a data-steppage="PMN01"><small class="floatRight">
                <asp:Literal ID="ltrStep9" runat="server"></asp:Literal></small></a></li>
        </ul>
        <div class="actionBar pie">
        </div>
        <div id="wizardContent" class="hiddenClass loaderWizardContent">
            <!--1 רישום פרטים-->
            <div class="stepContent">
                <Arkia:RGS03 ID="RGS03" runat="server" />
            </div>
            <!--2 רישום מלווים-->
            <div class="stepContent">
                <Arkia:RGS04 ID="RGS04" runat="server" />
            </div>
            <!--3 דמי השתתפות-->
            <div class="stepContent">
                <Arkia:RGS05 ID="RGS05" runat="server" />
            </div>
            <!--4 בתי מלון-->
            <!--4 רישום אורחים בחדרים-->
            <div class="stepContent">
                <Arkia:PRD01 ID="PRD01" runat="server" />
                <Arkia:PRD02 ID="PRD02" runat="server" />
            </div>
           <!--5 טיסות הלוך חזור-->
            <!--5 רישום נוסעים לטיסות-->
            <div class="stepContent">
                <Arkia:PRD03 ID="PRD03" runat="server" />
                <Arkia:PRD04 ID="PRD04" runat="server" />
            </div>
            <!--6 מוצרים נוספים-->
           <%-- <div class="stepContent">
                <Arkia:ShuttlePRD09 ID="ShuttlePRD09" runat="server" />
            </div>--%>
            <!-- 13 ארוחות -->
            <%--<div class="stepContent">
                <Arkia:MealsPRD13 ID="MealsPRD13" runat="server" />
            </div>--%>
            <!--7 מוצרים נוספים-->
            <div class="stepContent">
                    <Arkia:PRD05 ID="PRD05" runat="server"/>
            </div>
            <!--8 מוצרים נוספים-->
            <%--<div class="stepContent">
                    <Arkia:PRD06 ID="PRD06" runat="server"/>
            </div>--%>
            <!--8 מוצרים נוספים-->
            <%-- <div class="stepContent">
                    <Arkia:PRD07 ID="PRD07" runat="server"/>
            </div>--%>
            <!--9 פרטי רישום-->
            <div class="stepContent">
                <Arkia:PMN01 ID="PMN01" runat="server" />
            </div>
        </div>
        <div id="wizardLoader">
            <div class="loader">
            </div>
        </div>
    </div>
    <div class="clear">
    </div>
        </div>
    <!-- End SmartWizard Content -->
</asp:Content>
