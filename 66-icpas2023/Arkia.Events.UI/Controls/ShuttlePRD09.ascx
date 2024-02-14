<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ShuttlePRD09.ascx.cs" Inherits="Arkia.Events.LC2014.UI.Controls.ShuttlePRD09" %>
<%@ Register Src="~/Controls/InfoBoxCtrl.ascx" TagName="InfoBoxCtrl" TagPrefix="Arkia" %>
<div id="PRD09">
    <div id="shuttlePart1">
        <div data-ng-controller="ARKIA.WIZARD.SHUTTLE.productsCtrl" id="ng_Ctrl_PRD09">
            <div class="orangeHeader pieFix" role="heading" aria-level="2">
                <asp:Literal ID="ltrTitle" runat="server"></asp:Literal>
            </div>
            <div class="mainContentBox pieFix col-xs-12 col-sm-12">
                <div id="showsContent" class="hiddenClass">
                    <div id="infoBoxItems">
                        <Arkia:InfoBoxCtrl ID="infoBox" runat="server" DataSourceId="6" />
                    </div>

                    <div class="feesBox">
                        <!--repeater-->
                        <div data-ng-if="md ||lg ||sm">
                            <div role="grid" aria-labelledby="obShuttle">
                                <div class="greyPanel marginBottom25 marginTop25" data-ng-hide="!obShuttle" role="row">
                                    <label id="obShuttle" class="lblShowName " role="columnheader">
                                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD09_ShuttleToEilat%>" /></label>
                                    <label class="lblShowPrice " role="columnheader">
                                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD09_Price%>" />
                                    </label>
                                    <div class="cellProductsPrice" role="columnheader" aria-hidden="true">
                                    </div>
                                    <label class="cellProductsTickets" role="columnheader">
                                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD09_PassengerNum%>" />
                                    </label>
                                    <a class="clearForm" href="#" role="button" tabindex="0" ng-click="clearSelected()">
                                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD09_ClearSelection%>" /></a>
                                </div>
                                <div class="feesRow" ng-repeat="product in products1" data-ng-hide="!obShuttle" role="row">
                                    <div role="gridcell">
                                        <label role="AP_NAME" class="label colShowName">
                                            {{product.AP_NAME}}
                                        </label>
                                    </div>
                                    <div class="cellProductsPrice" role="gridcell">
                                        <label role="ADULT_PRICE" class="lblShowPrice" aria-hidden="true">{{product.ADULT_PRICE_FMT}}</label>
                                        <label style="font-size: 0px;">{{product.ADULT_PRICE_FMT2}}</label>
                                    </div>
                                    <div class="cellProductsPrice" role="gridcell" aria-hidden="true">
                                    </div>
                                    <div class="cellProductsTickets" role="gridcell">
                                        <select class="selShowTickets" role="ADULTS_PRD_NO" ng-change="addSum()" ng-model="product.ADULTS_PRD_NO"
                                            ng-options="c for c in passProducts1"
                                            aria-label='{{product.AP_NAME}} {{product.ADULT_PRICE_FMT}} <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD09_PassengerNum%>" />'>
                                            <option value="">0</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div role="grid" aria-labelledby="ibShuttle">
                                <div class="greyPanel marginBottom25 marginTop25" data-ng-hide="!ibShuttle" role="row">
                                    <label id="ibShuttle" class="lblShowName " role="columnheader">
                                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD09_ShuttleFromEilat%>" /></label>
                                    <label class="lblShowPrice " role="columnheader">
                                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD09_Price%>" />
                                    </label>
                                    <div class="cellProductsPrice" role="columnheader" aria-hidden="true">
                                    </div>
                                    <label class="cellProductsTickets" role="columnheader">
                                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD09_PassengerNum%>" /></label>

                                </div>
                                <div class="feesRow" ng-repeat="product in products2" data-ng-hide="!ibShuttle" role="row">
                                    <div role="gridcell">
                                        <label role="AP_NAME" class="label colShowName">
                                            {{product.AP_NAME}}
                                        </label>
                                    </div>
                                    <div class="cellProductsPrice" role="gridcell">
                                        <label role="ADULT_PRICE" class="lblShowPrice" aria-hidden="true">{{product.ADULT_PRICE_FMT}}</label>
                                        <label style="font-size: 0px;">{{product.ADULT_PRICE_FMT2}}</label>
                                    </div>
                                    <div class="cellProductsPrice" role="gridcell" aria-hidden="true">
                                    </div>
                                    <div class="cellProductsTickets" role="gridcell">
                                        <select class="selShowTickets" role="ADULTS_PRD_NO" ng-change="addSum()" ng-model="product.ADULTS_PRD_NO"
                                            ng-options="c for c in passProducts2"
                                            aria-label='{{product.AP_NAME}} {{product.ADULT_PRICE_FMT}} <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD09_PassengerNum%>" />'>
                                            <option value="">0</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <%--responsive--%>
                        <div class="shuttleRepeat" data-ng-if="xs">
                            <div class="marginBottom25 col-xs-12 col-sm-12" data-ng-repeat="product in products1" data-ng-hide="!obShuttle">
                                <div class=" col-xs-12 col-sm-12">
                                    <label class="greyPanel ">
                                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD09_ShuttleToEilat%>" /></label>
                                </div>

                                <div class="col-xs-12 col-sm-12 paddinfRow">
                                    <label role="AP_NAME" class="label colShowName col-xs-12 col-sm-12">{{product.AP_NAME}}</label>
                                </div>

                                <div class=" col-xs-12 col-sm-12 paddinfRow">
                                    <label class="lblShowPrice col-xs-6 col-sm-6">
                                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD09_Price%>" /></label>
                                    <label role="ADULT_PRICE" class="lblShowPrice col-xs-6 col-sm-6">{{product.ADULT_PRICE_FMT}}</label>
                                </div>
                                <div class=" col-xs-12 col-sm-12 paddinfRow">
                                    <label class="cellProductsTickets col-xs-6 col-sm-6">
                                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD09_PassengerNum%>" /></label>
                                    <select class="selShowTickets col-xs-3 col-xs-offset-3 col-sm-3 col-sm-offset-3" role="ADULTS_PRD_NO" ng-change="addSum()" ng-model="product.ADULTS_PRD_NO"
                                        ng-options="c for c in passProducts1"
                                        aria-label='{{product.AP_NAME}} {{product.ADULT_PRICE_FMT}} <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD09_PassengerNum%>" />'>
                                        <option value="">0</option>
                                    </select>
                                </div>
                            </div>


                            <div class="marginBottom25 col-xs-12 col-sm-12" data-ng-repeat="product in products2" data-ng-hide="!ibShuttle">
                                <div class=" col-xs-12 col-sm-12">
                                    <label class="greyPanel ">
                                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD09_ShuttleFromEilat%>" /></label>
                                </div>

                                <div class="col-xs-12 col-sm-12 paddinfRow">
                                    <label role="AP_NAME" class="label colShowName col-xs-12 col-sm-12">{{product.AP_NAME}}</label>
                                </div>

                                <div class=" col-xs-12 col-sm-12 paddinfRow">
                                    <label class="lblShowPrice col-xs-6 col-sm-6">
                                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD09_Price%>" />
                                    </label>
                                    <label role="ADULT_PRICE" class="lblShowPrice col-xs-6 col-sm-6">{{product.ADULT_PRICE_FMT}}</label>
                                </div>
                                <div class=" col-xs-12 col-sm-12 paddinfRow">
                                    <label class="cellProductsTickets col-xs-6 col-sm-6">
                                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD09_PassengerNum%>" /></label>
                                    <select class="selShowTickets col-xs-3 col-xs-offset-3 col-sm-3 col-sm-offset-3" role="ADULTS_PRD_NO" ng-change="addSum()" ng-model="product.ADULTS_PRD_NO"
                                        ng-options="c for c in passProducts2"
                                        aria-label='{{product.AP_NAME}} {{product.ADULT_PRICE_FMT}} <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD09_PassengerNum%>" />'>
                                        <option value="">0</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div class="feesRow">
                            <label id="noShuttle" for="cbNoShuttle" role="AP_NAME" class="label colShowName col-xs-6" style="width: 555px;">
                                <asp:Literal ID="ltrNoLunch" runat="server"></asp:Literal>
                            </label>
                            <div>
                                <input id="cbNoShuttle" class="cbNoLunch" type="checkbox" />
                            </div>
                        </div>
                    </div>
                    <div class="TotalPrice pie" role="alert">
                        <span>{{totalPriceText}}</span>
                        <div class="totalPriceMark pie">
                            <span class="bold">{{totalPrice}}</span>
                        </div>
                    </div>
                </div>
                <div id="showsLoader">
                    <div class="loader">
                    </div>
                </div>
            </div>
            <div id="btShuttleCon">
                <a class="btnContinue pieFix" href="#" role="button">
                    <div class="btnContinueInner">
                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , ContinuButton%>" />
                    </div>
                    <div id="Div2" runat="server" class="btnContinueText">
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div id="shuttlePart2" style="display: none">
        <div data-ng-controller="ARKIA.WIZARD.SHUTTLE.productsCtrl_2" id="ng_Ctrl_PRD09_PART2">
            <div class="orangeHeader pieFix" role="heading" aria-level="2">
                <asp:Literal ID="Literal1" runat="server"> </asp:Literal><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD09_SelectPassengers%>" />
            </div>
            <div class="mainContentBox pieFix col-xs-12 col-sm-12">
                <a href='#' class="floatLeft clearFlight" onclick="return false;" data-ng-click='clearSelected()'>
                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD09_ClearSelection%>" /></a>
                <div data-ng-hide="products1.length == 0">
                    <header class="ribbonWrap">
                        <div class="ribbon pieFix" role="heading" aria-level="3">
                            <span>
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD09_HalochShuttles%>" /></span>
                        </div>
                        <div class="ribbonCorner">
                        </div>
                    </header>
                    <div class="ribbonBox pieFix">
                        <div class="items" data-ng-repeat="item in products1">
                            <div class="greyPanel marginBottom25" role="heading" aria-level="4">
                                {{item.AP_NAME}}
                            </div>
                            <div class="passItem" data-ng-repeat="passItem in item.PASSENGERS">
                                <select role="FLIGHT_ACM_PRD04" class="selectName" data-ng-model="passItem.SELECT_CUSTOMER_NO" aria-required="true" required
                                    data-ng-options="p.CUSTOMER_NO as p.FULL_NAME  for p in passItem.VALUES" data-ng-change="passengersChange(item,passItem, products1)">
                                    <option value="">
                                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD09_Select%>" /></option>
                                </select>
                                <span class="lblFlightPrice" role="alert">{{passItem.PRICE_CURRENCY}}</span>
                            </div>
                            <div class="flightSeperator" data-ng-hide="$last">
                            </div>
                        </div>
                    </div>
                </div>
                <div data-ng-hide="products2.length == 0">
                    <header class="ribbonWrap">
                        <div class="ribbon pieFix" role="heading" aria-level="3">
                            <span>
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD09_BackShuttles%>" /></span>
                        </div>
                        <div class="ribbonCorner">
                        </div>
                    </header>
                    <div class="ribbonBox pieFix">
                        <div class="items" data-ng-repeat="item in products2">
                            <div class="greyPanel marginBottom25" role="heading" aria-level="4">
                                {{item.AP_NAME}}
                            </div>
                            <div class="passItem" data-ng-repeat="passItem in item.PASSENGERS">
                                <select role="FLIGHT_ACM_PRD04" class="selectName" data-ng-model="passItem.SELECT_CUSTOMER_NO" aria-required="true" required
                                    data-ng-options="p.CUSTOMER_NO as p.FULL_NAME  for p in passItem.VALUES" data-ng-change="passengersChange(item,passItem,products2)">
                                    <option value="">
                                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD09_Select%>" /></option>
                                </select>
                                <span class="lblFlightPrice" role="alert">{{passItem.PRICE_CURRENCY}}</span>
                            </div>
                            <div class="flightSeperator" data-ng-hide="$last">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="buttonNextShuttle" class="buttonNext col-xs-12 col-sm-12">
                <a class="btnContinue pieFix" href="#" role="button">
                    <div class="btnContinueInner">
                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , ContinuButton%>" />
                    </div>
                    <div id="btnContinueText" runat="server" class="btnContinueText">
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>


