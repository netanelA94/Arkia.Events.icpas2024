<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ProductsPRD06.ascx.cs" Inherits="Arkia.Events.LC2014.UI.Controls.ProductsPRD06" %>
<%@ Register Src="~/Controls/InfoBoxCtrl.ascx" TagName="InfoBoxCtrl" TagPrefix="Arkia" %>
<div id="addPrdPart1PRD06">
    <div class="orangeHeader pieFix" role="heading" aria-level="2">
        <asp:Literal ID="ltrTitle" runat="server"></asp:Literal>
    </div>
    <div data-ng-controller="ARKIA.WIZARD.PRODUCTS.PRD06.productsCtrl" id="ng_Ctrl_PRD06">
        <div class="mainContentBox pieFix col-xs-12 col-sm-12">
            <div id="showsContent" class="hiddenClass">
                <div id="infoBoxItems">
                    <Arkia:InfoBoxCtrl ID="infoBox" runat="server" DataSourceId="6" />
                </div>
                <div data-ng-if="md ||lg" role="table">
                    <div class="greyPanel marginBottom25 marginTop25" role="row">
                        <label class="lblShowName " role="columnheader">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD05_Product%>" /></label>
                        <label class="lblShowPrice " ng-if="!isChildPriceExists" role="columnheader">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD05_CardPrice%>" />
                        </label>
                        <div class="cellProductsPrice" ng-if="!isChildPriceExists" role="columnheader">
                        </div>
                        <label class="cellProductsTickets " ng-if="!isChildPriceExists" role="columnheader">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD05_Cards%>" /></label>
                        <label class="lblShowPrice" ng-if="isChildPriceExists" role="columnheader">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD05_PriceToAdults%>" /></label>
                        <label class="lblShowPrice" ng-if="isChildPriceExists" role="columnheader">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD05_PriceToChild%>" /></label>
                        <label id="adultTicketsAmount" class="cellProductsTickets" ng-if="isChildPriceExists" role="columnheader">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD05_CardsToAdult%>" />
                        </label>
                        <label id="childTicketsAmount" class="cellProductsTickets" ng-if="isChildPriceExists" role="columnheader">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD05_cardsToChild%>" /></label>
                        <a class="clearForm" ng-click="clearSelected()" href="#" role="button" tabindex="0">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD05_Clear%>" /></a>
                    </div>
                    <div class="feesBox">
                        <!--repeater-->
                        <div class="feesRow" ng-repeat="product in products" role="row">
                            <div role="gridcell">
                                <label role="AP_NAME" class="label colShowName">
                                    {{formatDate(product.EXECUTION_START_DATE) | date:'dd/MM/yyyy'}}   {{product.AP_NAME}}   
                                </label>
                            </div>
                            <div class="cellProductsPrice" role="gridcell">
                                <label role="ADULT_PRICE" class="lblShowPrice">{{product.ADULT_PRICE_FMT}}</label>
                                <label style="font-size: 0px;">{{product.ADULT_PRICE_FMT2}}</label>
                            </div>
                            <div class="cellProductsPrice" role="gridcell">
                                <label role="CHILD_PRICE" class="lblShowPrice" data-ng-if="isChildPriceExists">{{product.CHILD_PRICE_FMT}}</label>
                                <label style="font-size:0px;" data-ng-if="isChildPriceExists">{{product.CHILD_PRICE_FMT2}}</label>
                            </div>
                            <div data-ng-show="product.AVAILABILITY_TYPE_CODE == -1">
                                <div class="cellProductsTickets" role="gridcell">
                                    <select id="adultTickets" class="selShowTickets" role="ADULTS_PRD_NO" data-ng-change="addSum()" data-ng-model="product.ADULTS_PRD_NO"
                                        data-ng-options="c for c in product.adults">
                                        <option value="">0</option>
                                    </select>
                                    <div class="cellChildAge">+{{product.CHILD_AGE_END}}</div>
                                </div>
                                <div class="cellProductsTickets" role="gridcell">
                                    <select id="childTickets" class="selShowTickets" role="CHILDREN_PRD_NO" data-ng-change="addSum()" data-ng-model="product.CHILDREN_PRD_NO"
                                        data-ng-options="c for c in product.children" data-ng-if="!product.CHILD_PRICEIsNull && isChildPriceExists"
                                        data-ng-disabled="product.children.length == 0">
                                        <option value="">0</option>
                                    </select>
                                    <div class="cellChildAge" data-ng-if="!product.CHILD_PRICEIsNull && isChildPriceExists">{{product.CHILD_AGE_START}}-{{product.CHILD_AGE_END}}</div>
                                </div>
                            </div>
                            <div data-ng-show="product.AVAILABILITY_TYPE_CODE != -1">
                                <label class="lblShowPrice">
                                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD05_SoldOut%>" /></label>
                            </div>
                        </div>
                    </div>
                </div>
                <%--responsive--%>
                <div class="responsive col-xs-12 col-sm-12" data-ng-if="xs|| sm">
                    <div class="marginBottom25 marginTop25 col-xs-12 col-sm-12" ng-repeat="product in products">
                        <div class="col-xs-12 col-sm-12">
                            <label class="greyPanel ">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD05_AnotherProd%>" /></label>
                        </div>
                        <div class=" col-xs-12 col-sm-12">
                            <label role="AP_NAME" class="label colShowName">
                                {{formatDate(product.EXECUTION_START_DATE) | date:'dd/MM/yyyy'}}   {{product.AP_NAME}}
                            </label>
                        </div>

                        <div class="col-xs-12 col-sm-12" ng-if="!isChildPriceExists">
                            <label class="lblShowPrice col-xs-6 col-sm-6">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD05_CardPrice%>" /></label>
                            <label role="ADULT_PRICE" class="lblShowPrice col-xs-6 col-sm-6">{{product.ADULT_PRICE_FMT}}</label>
                        </div>
                        <div class="col-xs-12 col-sm-12" ng-if="!isChildPriceExists" data-ng-show="product.AVAILABILITY_TYPE_CODE == -1">
                            <label class="cellProductsTickets col-xs-6 col-sm-6">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD05_Cards%>" /></label>
                            <div>
                                <select class="selShowTickets col-sm-3 col-sm-offset-3 col-xs-3 col-xs-offset-3" role="ADULTS_PRD_NO" ng-change="addSum()" ng-model="product.ADULTS_PRD_NO"
                                    ng-options="c for c in adults">
                                    <option value="">0</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12" ng-if="isChildPriceExists">
                            <label class="lblShowPrice col-xs-6 col-sm-6">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD05_PriceToAdults%>" /></label>
                            <label role="ADULT_PRICE" class="lblShowPrice col-xs-6 col-sm-6">{{product.ADULT_PRICE_FMT}}</label>
                        </div>
                        <div class="col-xs-12 col-sm-12" ng-if="!product.CHILD_PRICEIsNull && isChildPriceExists">
                            <label class="lblShowPrice col-xs-6 col-sm-6">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD05_PriceToChild%>" /></label>
                            <label role="CHILD_PRICE" class="lblShowPrice col-xs-6 col-sm-6">{{product.CHILD_PRICE_FMT}}</label>
                        </div>
                        <div class="col-xs-12 col-sm-12" style="margin-top:10px;" ng-if="isChildPriceExists" data-ng-show="product.AVAILABILITY_TYPE_CODE == -1">
                            <label id="adultTicketsAmount2" class="cellProductsTickets col-xs-6 col-sm-6">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD05_CardsToAdult%>" /></label>
                            <div>
                                <select class="selShowTickets col-sm-3 col-sm-offset-3 col-xs-3 col-xs-offset-3" role="ADULTS_PRD_NO" ng-change="addSum()" ng-model="product.ADULTS_PRD_NO"
                                    ng-options="c for c in product.adults">
                                    <option value="">0</option>
                                </select>
                                <div class="cellChildAge col-xs-9">+{{product.CHILD_AGE_END}}</div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12" style="margin-top:10px;" ng-if="!product.CHILD_PRICEIsNull && isChildPriceExists" data-ng-show="product.AVAILABILITY_TYPE_CODE == -1">
                            <label id="childTicketsAmount2" class="cellProductsTickets col-xs-6 col-sm-6">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD05_cardsToChild%>" /></label>
                            <div>
                                <select class="selShowTickets col-sm-3 col-sm-offset-3 col-xs-3 col-xs-offset-3" role="CHILDREN_PRD_NO" ng-change="addSum()" ng-model="product.CHILDREN_PRD_NO"
                                    ng-options="c for c in product.children"
                                    ng-disabled="product.children.length == 0">
                                    <option value="">0</option>
                                </select>
                                <div class="cellChildAge col-xs-9">{{product.CHILD_AGE_START}}-{{product.CHILD_AGE_END}}</div>
                            </div>
                        </div>
                        <div data-ng-show="product.AVAILABILITY_TYPE_CODE != -1">
                            <label class="lblShowPrice full col-xs-6 col-sm-6">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD05_SoldOut%>" /></label>
                        </div>
                    </div>
                    <a class="clearForm col-xs-12 col-sm-12" ng-click="clearSelected()" role="button" tabindex="0">
                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD05_Clear%>" /></a>
                </div>
                <div class="TotalPrice pie" role="alert">
                    <span>{{totalPriceText}}</span>
                    <div class="totalPriceMark pie">
                        <span class="bold">{{totalPrice}}</span>
                    </div>
                </div>
            </div>
            <div id="showsLoader" class="col-xs-12 col-sm-12">
                <div class="loader">
                </div>
            </div>
        </div>


        <div id="btnAddPrdConPRD06">
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

<div id="addPrdPart2PRD06" style="display: none">
    <div data-ng-controller="ARKIA.WIZARD.PRODUCTS.PRD06.productsCtrl_2" id="ng_Ctrl_PRD06_2">
        <div class="orangeHeader pieFix" role="heading" aria-level="2">
            <asp:Literal ID="Literal1" runat="server"></asp:Literal> <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD05_SelectGuestsToAtractions%>" />
        </div>
        <div class="mainContentBox pieFix col-sm-12  ">
            <a href='#' class="floatLeft clearFlight" onclick="return false;" data-ng-click='clearSelected()'>
                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD05_Clear%>" /></a>
            <div data-ng-hide="products.length == 0">
                <header class="ribbonWrap">
                    <div class="ribbon pieFix" role="heading" aria-level="3">
                        <span>
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD05_Attractions%>" /></span>
                    </div>
                    <div class="ribbonCorner">
                    </div>
                </header>
                <div class="ribbonBox pieFix">
                    <div class="passItemBox" data-ng-repeat="item in products">
                        <div class="greyPanel marginBottom25" role="heading" aria-level="4">
                            {{item.AP_NAME}}
                        </div>
                        <div class="passItem" data-ng-repeat="passItem in item.PASSENGERS">
                            <label class="selectPassAge">
                                {{passItem.AGE_GROUP}} 
                            </label>
                            <select role="FLIGHT_ACM_PRD04" class="selectName" data-ng-model="passItem.SELECT_CUSTOMER_NO" aria-required="true" required
                                data-ng-options="p.CUSTOMER_NO as p.FULL_NAME  for p in passItem.VALUES" data-ng-change="passengersChange(item,passItem, products)">
                                <option value="">
                                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD05_Select%>" /></option>
                            </select>
                            <span class="lblFlightPrice">{{passItem.PRICE_CURRENCY}}</span>
                        </div>
                        <div class="flightSeperator" data-ng-hide="$last">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="buttonNextAddPrdPRD06" class="buttonNext col-xs-12 col-sm-12">
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

