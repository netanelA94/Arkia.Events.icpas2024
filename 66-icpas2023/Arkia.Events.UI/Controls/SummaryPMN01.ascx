<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="SummaryPMN01.ascx.cs"
    Inherits="Arkia.Events.LC2014.UI.Controls.PMN01" %>
<%@ Register Src="~/Controls/InfoBoxCtrl.ascx" TagName="InfoBoxCtrl" TagPrefix="Arkia" %>
<div ng-controller="ARKIA.WIZARD.SUMMARY.summaryCtrl" id="ng_Ctrl_PMN01">
    <div class="orangeHeader pieFix" role="heading" aria-level="2">
        <asp:Literal ID="ltrTitle" runat="server"></asp:Literal>
    </div>
    <div class="col-xs-12 col-sm-12 mainContentBox pieFix summaryPage ">
        <div class="subTitle">
            <span class="orangeSubTitle">
                <asp:Literal ID="ltrTextMarketing" runat="server"></asp:Literal>
            </span>
        </div>
        <Arkia:InfoBoxCtrl ID="infoBox" runat="server" DataSourceId="4" />
        <div class="greyPanel marginBottom25">
            <span class="defaultBoldLabel marginRight10">
                <asp:Literal ID="ltrSummaryNotice" runat="server"></asp:Literal>
            </span>
        </div>
        <div id="feesBox" class="col-sm-12 summaryBox" ng-hide="feesItems.length == 0">
            <header>
                <div id="participantsList" class="col-sm-12 ribbon pieFix" role="heading" aria-level="3">
                    <span>
                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_ParticipantsList%>" /></span>
                </div>
                <div class="ribbonCorner">
                </div>
            </header>
            <div data-ng-if="!xs">
                <div class="ribbonBox pieFix" role="grid" aria-labelledby="participantsList">
                    <div class="greyPanel marginBottomTop10" role="row">
                        <span class="col-sm-4 summaryCell" role="columnheader">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_Name%>" /></span>
                        <span class="col-sm-4 summaryCell" role="columnheader">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_RegistrationFeesType%>" /></span>
                        <span class="col-sm-4" role="columnheader">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_Value%>" /></span>
                    </div>
                    <div class="col-sm-12 summaryRow" data-ng-repeat="item in feesItems" role="row">
                        <span class="col-sm-4 summaryCell" role="gridcell">{{item.name}}</span>
                        <span class="col-sm-4 summaryCell" role="gridcell">{{item.feeName}}</span>
                        <span class="col-sm-4 lblPrice" role="gridcell">{{item.priceCurrency}}</span>
                    </div>
                </div>
            </div>
            <div data-ng-if="xs" class="col-xs-12">
                <div class="ribbonBox pieFix">
                    <div class="greyPanel marginBottomTop10 col-xs-12">
                        <span>
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_Participant%>" />
                            {{$index + 1}}</span>
                    </div>
                    <div class="summaryRow col-xs-12" data-ng-repeat="item in feesItems">
                        <span class="summaryCell col-xs-4 bold">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_Name%>" /></span>
                        <span class="summaryCell  col-xs-8">{{item.name}}</span>
                        <span class="summaryCell bigSummaryCell col-xs-4 bold">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_RegistrationFeesType%>" /></span>
                        <span class="summaryCell bigSummaryCell col-xs-8">{{item.feeName}}</span>
                        <span class="smallSummaryCell col-xs-4 bold">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_Value%>" /></span>
                        <span class="lblPrice  col-xs-8">{{item.priceCurrency}}</span>
                        <div class="flightSeparator" ng-hide="$last">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="hotelBox" class="col-sm-12 summaryBox" data-ng-hide="hotelsItems.length == 0">
            <header>
                <div id="hotel" class="col-sm-12 ribbon pieFix" role="heading" aria-level="3">
                    <span>{{hotelName}},
                        <asp:Literal ID="ltrHotelDate" runat="server"></asp:Literal></span>
                </div>
                <div class="ribbonCorner">
                </div>
            </header>
            <div class="ribbonBox pieFix">
                <div data-ng-repeat="selectedRoom in hotelsItems" data-ng-if="!xs" role="grid" aria-labelledby="hotel">
                    <div class="greyPanel marginBottomTop10" role="row">
                        <span class="summaryCell col-sm-4 " role="columnheader">{{selectedRoom.ROOM_TYPE_NAME}}</span>
                        <span class="summaryCell col-sm-4" role="columnheader">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_Guests%>" /></span>
                        <span class="col-sm-4" role="columnheader">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_Value%>" /></span>
                    </div>
                    <div class="summaryRow col-sm-12" role="row">
                        <span class="col-sm-4 summaryCell floatRight" role="gridcell">{{selectedRoom.BOARD}} / {{selectedRoom.PARTY_TYPE_NAME}}</span>
                        <div class="col-sm-4 summaryCell floatRight" role="gridcell">
                            <div ng-repeat="customer in selectedRoom.CUSTOMERS">
                                {{customer.NAME}}
                            </div>
                        </div>
                        <span class="col-sm-4 lblPrice floatRight" role="gridcell">{{selectedRoom.PRICE_FORMATTED}}</span>
                    </div>
                </div>

                <div data-ng-repeat="selectedRoom in hotelsItems" data-ng-if="xs" class="col-xs-12">
                    <div class="greyPanel col-xs-12">
                        <span>
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_Room%>" />
                            {{$index + 1}}</span>
                    </div>
                    <div class="summaryRow col-xs-12">
                        <span class="summaryCell col-xs-12 bold">{{selectedRoom.ROOM_TYPE_NAME}}</span>
                        <span class="summaryCell  col-xs-12 bold">{{selectedRoom.BOARD}} / {{selectedRoom.PARTY_TYPE_NAME}}</span>
                        <div class="guests">
                            <span class="summaryCell  col-xs-4 bold">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_Guests%>" /></span>
                            <div class="summaryCell col-xs-8">
                                <div ng-repeat="customer in selectedRoom.CUSTOMERS">
                                    <span>{{customer.NAME}}</span>
                                </div>
                            </div>
                        </div>
                        <span class="smallSummaryCell col-xs-4 bold">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_Value%>" /></span>
                        <span class="lblPrice  col-xs-8">{{selectedRoom.PRICE_FORMATTED}}</span>
                    </div>
                </div>
                <%-- <div class="summaryRow" ng-if="hotelsItems.length > 1">
                    <span class="summaryCell floatRight">דמי טיפול בגין חדר שני</span>
                    <div class="summaryCell floatRight">&nbsp
                    </div>
                    <span class="lblPrice floatRight">₪79</span>
                </div>--%>
            </div>
            <Arkia:InfoBoxCtrl ID="InfoBoxCtrl1" runat="server" DataSourceId="16" />
        </div>
        <div id="flightsBox" class="col-sm-12 summaryBox" ng-hide="flightsItems.length == 0">
            <header>
                <div id="flights" class="col-sm-12 ribbon pieFix" role="heading" aria-level="3">
                    <span>
                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_FlightsDetails%>" /></span>
                </div>
                <div class="ribbonCorner">
                </div>
            </header>
            <div class="ribbonBox pieFix">
                <div ng-repeat="item in flightsItems" data-ng-if="!xs" role="grid" aria-labelledby="flights">
                    <div class="col-sm-12 greyPanel marginBottomTop10" role="row">
                        <span class="col-sm-4 summaryCell" role="columnheader">{{item.DEP_STATION_NAME}} - {{item.ARR_STATION_NAME}} 
                            <span class="marginRight10">{{item.DEP_DATE}}</span>
                        </span>
                        <span class="col-sm-4 summaryCell" role="columnheader">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_Passengers%>" /></span>
                        <span class="col-sm-4" role="columnheader">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_Value%>" /></span>
                    </div>
                    <div ng-repeat="flightItem in item.FLIGHTS">
                        <div class="col-sm-12 summaryRow" ng-repeat="passItem in flightItem.PASSENGERS" role="row">
                            <span class="col-sm-4 summaryCell" role="gridcell">
                                <span ng-hide="!$first">
                                    <span class="flightDirection floatRight marginLeft10">
                                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_Flight%>" /></span>
                                    <span class="floatRight marginLeft10">{{flightItem.FLIGHT_DESC}}</span>
                                    <span>{{flightItem.DEP_TIME}}</span>
                                </span>
                            </span>
                            <span class="col-sm-4 summaryCell" role="gridcell">{{passItem.name}}</span>
                            <span class="col-sm-4 lblPrice" role="gridcell">{{passItem.priceCurrency}}</span>
                        </div>
                        <div class="col-sm-12 flightSeparator" ng-hide="$last">
                        </div>
                    </div>
                </div>
                <div ng-repeat="item in flightsItems" data-ng-if="xs" class="col-xs-12">
                    <div class="greyPanel col-xs-12">
                        <span class="bold">{{item.DEP_STATION_NAME}} - {{item.ARR_STATION_NAME}} <span class="marginRight10">{{item.DEP_DATE}}</span></span>
                    </div>
                    <div ng-repeat="flightItem in item.FLIGHTS" class="summaryRow col-xs-12">
                        <div style="display: flex;">
                            <span class="flightDirection marginLeft10 bold">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_Flight%>" /></span>
                            <span class="summaryCell  col-xs-12 bold">{{flightItem.FLIGHT_DESC}} - {{flightItem.DEP_TIME}}</span>
                        </div>
                        <span class="summaryCell col-xs-12 bold">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_Passengers%>" /></span>
                        <div class="summaryCell col-xs-12" ng-repeat="passItem in flightItem.PASSENGERS">
                            <span class="summaryCell  col-xs-6">{{passItem.name}}</span>
                            <span class="summaryCell  col-xs-6 lblPrice">{{passItem.priceCurrency}}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div id="shuttlesBox" class="col-sm-12 summaryBox" data-ng-hide="shuttlesItems.length == 0">
            <header>
                <div id="shuttles" class="col-sm-12 ribbon pieFix" role="heading" aria-level="3">
                    <span>
                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_Shuttles%>" /></span>
                </div>
                <div class="ribbonCorner pieFix">
                </div>
            </header>
            <div class="ribbonBox pieFix" role="grid" aria-labelledby="shuttles">
                <div data-ng-if="!xs">
                    <div class="col-sm-12 greyPanel marginBottomTop10" role="row">
                        <span class="col-sm-4 summaryCell  floatRight" role="columnheader">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_Shuttle%>" /></span>
                        <span class="col-sm-4 summaryCell floatRight" role="columnheader">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_Passengers%>" /></span>
                        <span class="col-sm-4" role="columnheader">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_Value%>" /></span>
                    </div>
                    <div ng-repeat="productItem in shuttlesItems">
                        <div class="col-sm-12 summaryRow" role="row" style="line-height: 45px;" ng-repeat="passItem in productItem.PASSENGERS">
                            <span class="col-sm-4 summaryCell floatRight" role="gridcell">
                                <span>
                                    <span class="floatRight marginLeft10">
                                        <span ng-hide="!$first">{{productItem.name}}</span>&nbsp</span>
                                </span>
                            </span>
                            <span class="col-sm-4 summaryCell floatRight" role="gridcell">{{passItem.name}}</span>
                            <span class="col-sm-4 lblPrice" role="gridcell">{{passItem.priceCurrency}}</span>
                        </div>
                        <div class="col-sm-12 flightSeparator" ng-hide="$last">
                        </div>
                    </div>
                </div>
                <div data-ng-if="xs" class="col-xs-12">
                    <div ng-repeat="productItem in shuttlesItems" class="col-xs-12 summaryRow">
                        <div class="greyPanel col-xs-12">
                            <span>{{productItem.name}}</span>
                        </div>
                        <span class="summaryCell col-xs-12 bold">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_Passengers%>" /></span>
                        <div class="summaryRow col-xs-12" ng-repeat="passItem in productItem.PASSENGERS">
                            <span class="summaryCell  col-xs-6">{{passItem.name}}</span>
                            <span class="lblPrice summaryCell  col-xs-6">{{passItem.priceCurrency}}</span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        <div id="addProductsBox" class="col-sm-12 summaryBox" ng-hide="productsItems.length == 0">
            <header>
                <div id="products" class="col-sm-12 ribbon pieFix" role="heading" aria-level="3">
                    <span>
                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_AdditionalProductDetails%>" /></span>
                </div>
                <div class="col-sm-12 ribbonCorner pieFix">
                </div>
            </header>
            <div class="ribbonBox pieFix" role="grid" aria-labelledby="products">
                <div data-ng-if="!xs">
                    <div class="col-sm-12 greyPanel marginBottomTop10" role="row">
                        <span class="col-sm-4 summaryCell" role="columnheader">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_Product%>" /></span>
                        <span class="col-sm-4 summaryCell" role="columnheader">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_UnitsNumber%>" /></span>
                        <span class="col-sm-4" role="columnheader">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_Value%>" /></span>
                    </div>
                    <%--<div class="col-sm-12 summaryRow" ng-repeat="productItem in productsItems" role="row">
                        <span class="col-sm-4 summaryCell" role="gridcell">{{productItem.name}}</span>
                        <span class="col-sm-4 summaryCell" role="gridcell">{{productItem.number}}</span>
                        <span class="col-sm-4 lblPrice" role="gridcell">{{productItem.price}}</span>
                    </div>--%>
                    <div ng-repeat="productItem in productsItems">
                        <div class="col-sm-12 summaryRow" ng-repeat="passItem in productItem.PASSENGERS" style="line-height: 45px;" role="row">
                            <span class="col-sm-4 summaryCell floatRight" role="gridcell">
                                <span ng-hide="!$first">
                                    <span class="floatRight marginLeft10"></span>
                                    <span class="floatRight marginLeft10">{{productItem.name}}</span>
                                </span>
                            </span>
                            <span class="col-sm-4 summaryCell" role="gridcell">{{passItem.name}}</span>
                            <span class="col-sm-4 lblPrice" role="gridcell">{{passItem.price}}</span>
                        </div>
                    </div>
                </div>
                <div data-ng-if="xs" class="col-xs-12">
                    <div class="summaryRow col-xs-12" ng-repeat="productItem in productsItems">
                        <div class="greyPanel col-xs-12">
                            <span>{{productItem.name}}</span>
                        </div>
                        <div ng-repeat="passItem in productItem.PASSENGERS">
                            <span class="summaryCell col-xs-4 bold">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_UnitsNumber%>" /></span>
                            <%--<span class="summaryCell  col-xs-8">{{productItem.number}}</span>--%>

                            <span class="summaryCell">{{passItem.name}}</span>
                            <span class="smallSummaryCell col-xs-4 bold">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_Value%>" /></span>
                            <span class="lblPrice  col-xs-8">{{passItem.price}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="TotalPrice pie">
            <span>
                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN01_TotalOrderValue%>" /></span>
            <div class="totalPriceMark pie">
                <span class="bold">{{totalPrice}}</span>
            </div>
        </div>
    </div>
    <div>
    </div>
    <div id="regulationsBox" runat="server" class="bottomLink">
        <div class="linkSimple">
            <a id="hlRegulations" target="_blank" runat="server" class="linkSimple" style="font-weight: 700; font-size: 15px;">
                <asp:Literal ID="ltrRegulations" runat="server"></asp:Literal></a>
        </div>
        <div class="regulations" style="font-weight: 700; font-size: 15px; color: #008476;">
            <input id="cbReg" type="checkbox" />
            <label for="cbReg">
                <asp:Literal ID="ltrConfirmRegulations" runat="server"></asp:Literal>
            </label>
        </div>
    </div>
</div>
<div id="btnFinish">
    <a class="btnContinue pieFix" href="#" role="button">
        <div class="btnContinueInner">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , ContinuButton%>" />
        </div>
        <div id="btnContinueText" runat="server" class="btnContinueText">
        </div>
    </a>
</div>
<div id="loader" class="loaderClick hiddenClass">
</div>
