<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="FeesRGS05.ascx.cs" Inherits="Arkia.Events.LC2014.UI.Controls.RGS05" %>
<%@ Register Src="~/Controls/InfoBoxCtrl.ascx" TagName="InfoBoxCtrl" TagPrefix="Arkia" %>
<div class="pie" ng-controller="ARKIA.WIZARD.FEES.registrFeeCtrl" id="ng_Ctrl_RGS05">
    <div class="orangeHeader pieFix" role="heading" aria-level="2">
        <asp:Literal ID="ltrTitle" runat="server"></asp:Literal>
    </div>
    <div class="mainContentBox pieFix col-sm-12 col-xs-12">
        <Arkia:InfoBoxCtrl ID="infoBox" runat="server" DataSourceId="2" />
        <!-- ROW -->
        <div class="feesBox">
            <div ng-repeat="item in items">
                <div class="feesRow" >
                    <label role="NAME_ACM_RGS05" class="lblname col-xs-4 col-sm-4 label feecell">
                        {{item.LATIN_FIRST_NAME}} {{item.LATIN_LAST_NAME}}
                    </label>
                    <select id="lblselect" class="lblselect feecell feesOptions col-xs-5 col-sm-5" role="FEE_ACM_RGS05" ng-disabled="item.FEES.length == 1" aria-label='<asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS05_Fees%>"/>{{item.LATIN_FIRST_NAME}} {{item.LATIN_LAST_NAME}}'
                        ng-change="feesChange(item, true)" ng-model="item.SELECTED_PRD_KEY" ng-options="c.AP_PRD_KEY as c.AP_NAME  for c in item.FEES" aria-disabled="{{item.FEES.length == 1}}">
                        <option value="" aria-hidden="{{item.FEES.length == 1}}"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS05_Select%>"/></option>
                    </select>
                    <label role="PRICE_ACM_RGS05" class="lblPrice col-xs-2 col-sm-2">
                        {{item.PRICE_CURRENCY}}</label>
                </div>
            </div>
        </div>
        <div class="TotalPrice pie">
            <span><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS05_TotalRegistrationValue%>"/></span>
            <div class="totalPriceMark pie">
                <span class="bold">{{totalPrice}}</span>
            </div>
        </div>
        <!-- END ROW -->
    </div>
</div>
<div id="buttonNextFees" class="buttonNext col-xs-12 col-sm-12">
    <a class="btnContinue pieFix" href="#" role="button">
        <div class="btnContinueInner">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , ContinuButton%>"/></div>
        <div id="btnContinueText" runat="server" class="btnContinueText">
        </div>
    </a>
</div>
