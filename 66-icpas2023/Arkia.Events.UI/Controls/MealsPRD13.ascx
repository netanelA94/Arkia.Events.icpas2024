<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="MealsPRD13.ascx.cs"
    Inherits="Arkia.Events.LC2014.UI.Controls.MealsPRD13" %>
<%@ Register Src="~/Controls/InfoBoxCtrl.ascx" TagName="InfoBoxCtrl" TagPrefix="Arkia" %>
<div id="PRD13">
    <div id="mealsPart1">
        <div data-ng-controller="ARKIA.WIZARD.MEALS.PRD13.productsCtrl" id="ng_Ctrl_PRD13">
            <div class="orangeHeader pieFix" role="heading" aria-level="2">
                <asp:Literal ID="ltrTitle" runat="server"></asp:Literal>
            </div>
            <div class="mainContentBox pieFix col-sm-12">
                <div id="showsContent" class="hiddenClass">
                    <div id="infoBoxItems">
                        <Arkia:InfoBoxCtrl ID="infoBox" runat="server" DataSourceId="6" />
                    </div>
                    <div class="feesBox">
                        <div data-ng-if="md ||lg ||sm">
                            <div role="grid">
                            <div class="greyPanel marginBottom25 marginTop25" role="row">
                                <label class="lblShowName " role="columnheader">
                                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_Prod%>" /></label>
                                <label class="lblShowPrice" ng-if="!isChildPriceExists" role="columnheader">
                                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_Price%>" />
                                </label>
                                <div class="cellProductsPrice" ng-if="!isChildPriceExists" role="columnheader" aria-hidden="{{!isChildPriceExists}}">
                                </div>
                                <label for="selShowTickets" class="cellProductsTickets " ng-if="!isChildPriceExists" role="columnheader">
                                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_Amount%>" /></label>
                                <label class="lblShowPrice" ng-if="isChildPriceExists" role="columnheader">
                                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_PriceToAdult%>" /></label>
                                <label class="lblShowPrice" ng-if="isChildPriceExists" role="columnheader">
                                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_PriceToChild%>" /></label>
                                <label class="cellProductsTickets" ng-if="isChildPriceExists" role="columnheader">
                                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_AmountAdult%>" />
                                </label>
                                <label class="cellProductsTickets" ng-if="isChildPriceExists" role="columnheader">
                                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_AmountChild%>" /></label>
                                <a class="clearForm" ng-click="clearSelected()" href="#" role="button" tabindex="0">
                                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_Clear%>" /></a>
                            </div>


                            <!--repeater-->
                            <div class="feesRow" ng-repeat="product in products" role="row">
                                <div role="gridcell">
                                    <label role="AP_NAME" class="label colShowName">
                                        {{product.AP_NAME}}
                                    </label>
                                </div>
                                <div class="cellProductsPrice" role="gridcell">
                                    <label role="ADULT_PRICE" class="lblShowPrice" aria-hidden="true">{{product.ADULT_PRICE_FMT}}</label>
                                    <label style="font-size: 0px;">{{product.ADULT_PRICE_FMT2}}</label>
                                </div>
                                <div class="cellProductsPrice" role="gridcell" aria-hidden="{{!isChildPriceExists}}">
                                    <label role="CHILD_PRICE" class="lblShowPrice" ng-if="isChildPriceExists">
                                        {{product.CHILD_PRICE_FMT}}</label>
                                </div>
                                <div class="cellProductsTickets" role="gridcell">
                                    <select id="selShowTickets" class="selShowTickets" role="ADULTS_PRD_NO" ng-change="addSum()" ng-model="product.ADULTS_PRD_NO"
                                        ng-options="c for c in adults"
                                        aria-label='{{product.AP_NAME}} {{product.ADULT_PRICE_FMT}} <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_AmountAdult%>" />'>
                                        <option value="">0</option>
                                    </select>
                                </div>
                                <div class="cellProductsTickets" role="gridcell">
                                    <select class="selShowTickets" role="CHILDREN_PRD_NO" ng-change="addSum()" ng-model="product.CHILDREN_PRD_NO"
                                        ng-options="c for c in children" ng-if="!product.CHILD_PRICEIsNull && isChildPriceExists"
                                        ng-disabled="children.length == 0"
                                        aria-label='{{product.AP_NAME}} {{product.CHILD_PRICE_FMT}} <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_AmountAdult%>" />'>
                                        <option value="">0</option>
                                    </select>
                                </div>
                            </div>
                          </div>
                        </div>

                        <%-- responsive--%>
                        <div data-ng-if="xs">
                            <div class="marginBottom25 marginTop25 col-xs-12" ng-repeat="product in products">

                                <div class=" col-xs-12 col-sm-12">
                                    <label class="greyPanel ">
                                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_Prod%>" /></label>
                                </div>
                                <div class=" col-xs-12 col-sm-12">
                                    <label role="AP_NAME" class="label colShowName">
                                        {{product.AP_NAME}}
                                    </label>
                                </div>

                                <div class="col-xs-12 col-sm-12" ng-if="!isChildPriceExists">
                                    <label class="lblShowPrice col-xs-6 col-sm-6">
                                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_Price%>" />
                                    </label>
                                    <label role="ADULT_PRICE" class="col-xs-6 col-sm-6 lblShowPrice">{{product.ADULT_PRICE_FMT}}</label>
                                </div>

                                <div class="col-xs-12 col-sm-12" ng-if="!isChildPriceExists">
                                    <label class="cellProductsTickets col-xs-6 col-sm-6">
                                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_Amount%>" /></label>
                                    <div>
                                        <select class="col-xs-3 col-xs-offset-3 selShowTickets" role="ADULTS_PRD_NO" ng-change="addSum()" ng-model="product.ADULTS_PRD_NO"
                                            ng-options="c for c in adults"
                                            aria-label='{{product.AP_NAME}} {{product.ADULT_PRICE_FMT}} <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_Amount%>" />'>
                                            <option value="">0</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-xs-12 col-sm-12" ng-if="isChildPriceExists">
                                    <label class="col-xs-6 col-sm-6 lblShowPrice">
                                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_PriceToAdult%>" /></label>
                                    <label role="ADULT_PRICE" class="col-xs-6 col-sm-6 lblShowPrice">{{product.ADULT_PRICE_FMT}}</label>
                                </div>

                                <div class="col-xs-12 col-sm-12" ng-if="isChildPriceExists">
                                    <label class="col-xs-6 col-sm-6 lblShowPrice">
                                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_PriceToChild%>" /></label>
                                    <label role="CHILD_PRICE" class="col-xs-6 col-sm-6 lblShowPrice">{{product.CHILD_PRICE_FMT}}</label>
                                </div>

                                <div class="col-xs-12 col-sm-12" ng-if="isChildPriceExists">
                                    <label class="cellProductsTickets col-xs-6 col-sm-6">
                                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_AmountAdult%>" /></label>
                                    <div>
                                        <select class="col-xs-3 col-xs-offset-3 selShowTickets" role="ADULTS_PRD_NO" ng-change="addSum()" ng-model="product.ADULTS_PRD_NO"
                                            ng-options="c for c in adults"
                                            aria-label='{{product.AP_NAME}} {{product.CHILD_PRICE_FMT}} <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_AmountAdult%>" />'>
                                            <option value="">0</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-xs-12 col-sm-12" ng-if="isChildPriceExists">
                                    <label class="col-xs-6 col-sm-6 cellProductsTickets">
                                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_AmountChild%>" /></label>
                                    <div class=" cellProductsTickets">
                                        <select class="selShowTickets col-xs-3 col-xs-offset-3" role="CHILDREN_PRD_NO" ng-change="addSum()" ng-model="product.CHILDREN_PRD_NO"
                                            ng-options="c for c in children" ng-if="!product.CHILD_PRICEIsNull && isChildPriceExists"
                                            ng-disabled="children.length == 0">
                                            <option value="">0</option>
                                        </select>
                                    </div>
                                </div>



                            </div>
                        </div>

                        <div class="feesRow">
                            <label id="noLunch" for="cbNoLunch" role="AP_NAME" class="label colShowName col-xs-8">
                                <asp:Literal ID="ltrNoLunch" runat="server"></asp:Literal>
                            </label>
                            <div>
                                <input id="cbNoLunch" class="cbNoLunch" type="checkbox" />
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
            <div id="btnMealsCon">
                <a class="btnContinue pieFix" href="#" role="button">
                    <div class="btnContinueInner">
                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , ContinuButton%>" />
                    </div>
                    <div id="Div2" runat="server" class="col-xs-12 col-sm-12 btnContinueText">
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div id="mealsPart2" style="display: none">
        <div data-ng-controller="ARKIA.WIZARD.MEALS.PRD13.productsCtrl_2" id="ng_Ctrl_PRD13_MEALS">
            <div class="orangeHeader pieFix" role="heading" aria-level="2">
                <asp:Literal ID="Literal1" runat="server"> </asp:Literal><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_SelectGuests%>" />
            </div>
            <div class="mainContentBox pieFix col-sm-12  ">
                <%--<Arkia:InfoBoxCtrl ID="InfoBoxCtrl1" runat="server" DataSourceId="3" />--%>
                <a href='#' class="floatLeft clearFlight" role="button" onclick="return false;" data-ng-click='clearSelected()'>
                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_Clear%>" /></a>
                <header class="ribbonWrap">
                    <div class="ribbon pieFix" role="heading" aria-level="3">
                        <asp:Label ID="lblOBFlightHeader" runat="server"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_MealsToSelect%>" /></asp:Label>
                    </div>
                    <div class="ribbonCorner">
                    </div>
                </header>
                <div class="ribbonBox pieFix">
                    <div class="greyPanel marginBottom25" role="heading" aria-level="4">
                        <span class="marginRight10"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_MealAtHotel%>" /> {{hotelName}} <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_Hotel%>" /></span>
                    </div>
                    <div class="passItem" data-ng-repeat="passItem in productsMeals">
                        <label class="mealselectPassAge hidden">
                            {{passItem.AGE_GROUP}}
                        </label>
                        <select role="FLIGHT_ACM_PRD04" class="selectName" data-ng-model="passItem.SELECT_CUSTOMER_NO" aria-required="true" required
                            data-ng-options="p.CUSTOMER_NO as p.FULL_NAME  for p in passItem.VALUES" data-ng-change="passengersChange(passItem)">
                            <option value="">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD13_Select%>" /></option>
                        </select>
                        <span class="lblFlightPrice">{{passItem.PRICE_CURRENCY}}</span>
                    </div>
                    <div class="flightSeperator" ng-hide="$last">
                    </div>
                </div>
            </div>
            <div id="buttonNextMeals" class="buttonNext col-xs-12 col-sm-12">
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

