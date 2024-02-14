<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="FlightsPRD04.ascx.cs" Inherits="Arkia.Events.LC2014.UI.Controls.PRD04" %>
<%@ Register Src="~/Controls/InfoBoxCtrl.ascx" TagName="InfoBoxCtrl" TagPrefix="Arkia" %>
<div id="PRD04" style="display: none">
    <div ng-controller="ARKIA.WIZARD.FLIGHTS.FlightsPassCtrl" id="ng_Ctrl_PRD04">
        <div class="orangeHeader pieFix" role="heading" aria-level="2">
            <asp:Literal ID="ltrTitle" runat="server"></asp:Literal>
        </div>
        <div class="mainContentBox pieFix col-xs-12 col-sm-12">
            <Arkia:InfoBoxCtrl ID="infoBox" runat="server" DataSourceId="3" />
            <a href='#' class="floatLeft clearFlight" onclick="return false;" ng-click='clearSelected()'>
                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD04_Clear%>" /></a>
            <a href='#' class="floatLeft clearFlight" onclick="return false;" ng-click='returnToSelectFlights()'>
                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD04_ReturnToFlight%>" /></a>
            <div ng-hide="itemsOB.length == 0">
                <header class="ribbonWrap">
                    <div class="ribbon pieFix" role="heading" aria-level="3">
                        <asp:Label ID="lblOBFlightHeader" runat="server"></asp:Label>
                    </div>
                    <div class="ribbonCorner">
                    </div>
                </header>
                <div class="ribbonBox pieFix">
                    <div class="items" ng-repeat="item in itemsOB">
                        <div class="greyPanel marginBottom25" role="heading" aria-level="4">
                            <span class="marginRight10"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD04_From%>"/>{{item.DEP_STATION_NAME}} <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD04_To%>"/>{{item.ARR_STATION_NAME}}, <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD04_At%>"/> {{item.DEP_TIME}}</span>
                        </div>
                        <div class="passItem" ng-repeat="passItem in item.PASSENGERS">
                            <select role="FLIGHT_ACM_PRD04" class="selectName" ng-model="passItem.SELECT_CUSTOMER_NO" aria-required="true" required
                                ng-options="p.CUSTOMER_NO as p.FULL_NAME  for p in passItem.VALUES" ng-change="passengersChange(item,passItem, itemsOB)">
                                <option value="">
                                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD04_Select%>" /></option>
                            </select>
                            <span class="lblFlightPrice" role="alert">{{passItem.PRICE_CURRENCY}}</span>
                        </div>
                        <div class="flightSeperator" ng-hide="$last">
                        </div>
                    </div>
                </div>
            </div>
            <div ng-hide="itemsIB.length == 0">
                <header class="ribbonWrap">
                    <div class="ribbon pieFix" role="heading" aria-level="3">
                        <asp:Label ID="lblIBFlightHeader" runat="server"></asp:Label>
                    </div>
                    <div class="ribbonCorner">
                    </div>
                </header>
                <div class="ribbonBox pieFix">
                    <div class="items" ng-repeat="item in itemsIB">
                        <div class="greyPanel marginBottom25" role="heading" aria-level="4">
                            <span class="marginRight10"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD04_From%>"/>{{item.DEP_STATION_NAME}} <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD04_To%>"/>{{item.ARR_STATION_NAME}}, <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD04_At%>"/> {{item.DEP_TIME}}</span>
                        </div>
                        <div class="passItem" ng-repeat="passItem in item.PASSENGERS">
                            <div class="ghghjghgh">
                                <select role="FLIGHT_ACM_PRD04" class="selectName" ng-model="passItem.SELECT_CUSTOMER_NO" aria-required="true" required
                                    ng-options="p.CUSTOMER_NO as p.FULL_NAME  for p in passItem.VALUES" ng-change="passengersChange(item,passItem,itemsIB)">
                                    <option value="">
                                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD04_Select%>" /></option>
                                </select>
                                <span class="lblFlightPrice" role="alert">{{passItem.PRICE_CURRENCY}}</span>
                            </div>
                        </div>
                        <div class="flightSeperator" ng-hide="$last">
                        </div>
                    </div>
            </div>
        </div>
        <div class="TotalPrice pie" ng-hide="itemsIB.length == 0 && itemsOB.length == 0">
            <span>
                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD04_TotalePrice%>" />
            </span>
            <div class="totalPriceMark pie">
                <span class="bold">{{totalPrice}}</span>
            </div>
        </div>
    </div>
    <div id="buttonNextFlights" class="buttonNext col-xs-12 col-sm-12">
        <a class="btnContinue pieFix" href="#" role="button">
            <div class="btnContinueInner">
                המשך
            </div>
            <div id="btnContinueText" runat="server" class="btnContinueText">
            </div>
        </a>
    </div>
</div>
</div>
