<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="FlightsPRD03.ascx.cs" Inherits="Arkia.Events.LC2014.UI.Controls.PRD03" %>
<div id="PRD03">
    <div ng-controller="ARKIA.WIZARD.FLIGHTS.FlightsCtrl" id="ng_Ctrl_PRD03">
        <div class="orangeHeader pieFix" role="heading" aria-level="2">
            <asp:Literal ID="ltrTitle" runat="server"></asp:Literal>
        </div>
        <div class="mainContentBox pieFix col-xs-12 col-sm-12">
            <div id="flightsContent" class="hiddenClass">
                <header class="pieFix ribbonWrap">
                    <div class="ribbon pieFix" role="heading" aria-level="3">
                        <asp:Label ID="lblOBFlightHeader" runat="server"></asp:Label>
                    </div>
                    <div class="ribbonCorner pieFix">
                    </div>
                </header>
                <div class="ribbonBox pieFix">
                    <div ng-repeat="item in itemsOB">
                        <div class="titleSeperator">
                            <span class="title " role="heading" aria-level="4"><span><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_From%>"/>{{item.DEP_STATION_NAME}} <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_To%>"/>{{item.ARR_STATION_NAME}}</span></span>
                            <div class="stroke">
                            </div>
                        </div>
                        <div ng-repeat="flightItem in item.FLIGHTS.Value" class="flightItemRow">
                            <div class="flightRow">
                                <span class="defaultBoldLabel flightName first col-xs-12 col-sm-12"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_From%>"/>{{item.DEP_STATION_NAME}} <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_To%>"/>{{item.ARR_STATION_NAME}}</span>
                                <span class="col-xs-6 col-sm-2"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_Flight%>"/> {{flightItem.DEP_TIME}}</span>
                                <span class="col-xs-6 col-sm-2"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_Landing%>"/> {{flightItem.ARR_TIME}}</span>
                                <span class="long col-xs-6 col-sm-3"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_PriceToAdult%>"/> {{flightItem.ADULT_PRICE}} {{flightItem.CURRENCY_NAME}}</span>
                                <span class="long col-xs-6 col-sm-12" ng-hide="flightItem.SEATS_NO == 0"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_PassengersNum%>"/>
                                <select role="PASSENGERS_OB_FLIGHT_PRD03" ng-model="flightItem.selectPassNo" ng-options="n for n in passengers" ng-change="passengersCountChange()"
                                    aria-label='<asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_From%>"/>{{item.DEP_STATION_NAME}} <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_To%>"/>{{item.ARR_STATION_NAME}} 
                                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_Flight%>"/> {{flightItem.DEP_TIME}} 
                                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_Landing%>"/> {{flightItem.ARR_TIME}}
                                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_PriceToAdult%>"/> {{flightItem.ADULT_PRICE}} {{flightItem.CURRENCY_NAME}}
                                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_PassengersNum%>"/>' >
                                    <option value="">0</option>
                                </select>
                                </span>
                                <span class="floatLeft last lastPrice long col-xs-12 col-sm-12" ng-show="flightItem.SEATS_NO == 1">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_OnePlace%>"/></span>
                                <span class="floatLeft last lastPrice col-xs-12 col-sm-12" ng-show="flightItem.SEATS_NO < 7 && flightItem.SEATS_NO > 1"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_Left%>"/> {{flightItem.SEATS_NO}} <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_SumPlace%>"/></span>
                                <span class="floatLeft last defaultBoldLabel col-xs-12 col-sm-12"
                                    ng-show="flightItem.SEATS_NO == 0"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_Full%>"/></span>
                            </div>
                            <div class="flightSeparator" ng-hide="$last">
                            </div>
                        </div>
                    </div>
                </div>
                <header class="ribbonWrap">
                    <div class="ribbon pieFix" role="heading" aria-level="3">
                        <asp:Label ID="lblIBFlightHeader" runat="server"></asp:Label>
                    </div>
                    <div class="ribbonCorner">
                    </div>
                </header>
                <div class="ribbonBox pieFix">
                    <div ng-repeat="item in itemsIB">
                        <div class="titleSeperator">
                            <span class="title " role="heading" aria-level="4"><span><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_From%>"/>{{item.DEP_STATION_NAME}} <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_To%>"/>{{item.ARR_STATION_NAME}}</span></span>
                            <div class="stroke">
                            </div>
                        </div>
                        <div ng-repeat="flightItem in item.FLIGHTS.Value" class="flightItemRow">
                            <div class="flightRow ">
                                <span class="defaultBoldLabel flightName col-xs-12 col-sm-12"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_From%>"/>{{item.DEP_STATION_NAME}} <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_To%>"/>{{item.ARR_STATION_NAME}}</span>
                                <span class="col-xs-6 col-sm-2"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_Flight%>"/> {{flightItem.DEP_TIME}}</span>
                                <span class="col-xs-6 col-sm-2"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_Landing%>"/> {{flightItem.ARR_TIME}}</span>
                                <span class="long col-xs-6 col-sm-3"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_PriceToAdult%>"/> {{flightItem.ADULT_PRICE}} {{flightItem.CURRENCY_NAME}}</span>
                                <span class="long col-xs-6 col-sm-3" ng-hide="flightItem.SEATS_NO == 0"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_PassengersNum%>"/>
                                <select role="PASSENGERS_IB_FLIGHT_PRD03" ng-model="flightItem.selectPassNo" ng-options="n for n in passengers" ng-change="passengersCountChange()"
                                    aria-label='<asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_From%>"/>{{item.DEP_STATION_NAME}} <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_To%>"/>{{item.ARR_STATION_NAME}} 
                                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_Flight%>"/> {{flightItem.DEP_TIME}} 
                                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_Landing%>"/> {{flightItem.ARR_TIME}}
                                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_PriceToAdult%>"/> {{flightItem.ADULT_PRICE}} {{flightItem.CURRENCY_NAME}}
                                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_PassengersNum%>"/>''>
                                    <option value="">0</option>
                                </select>
                                </span>
                                <span class="floatLeft last lastPrice col-xs-12 col-sm-12" ng-show="flightItem.SEATS_NO == 1">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_OnePlace%>"/></span>
                                <span class="floatLeft last lastPrice col-xs-12 col-sm-12" ng-show="flightItem.SEATS_NO < 7 && flightItem.SEATS_NO > 1"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_Left%>"/> {{flightItem.SEATS_NO}} <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_SumPlace%>"/></span>
                                <span class="floatLeft last defaultBoldLabel col-xs-12 col-sm-12"
                                    ng-show="flightItem.SEATS_NO == 0"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_Full%>"/></span>
                            </div>
                            <div class="flightSeparator" ng-hide="$last">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="flightsLoader">
                <div class="loader"></div>
            </div>
        </div>
        <div class="bottomLink">
            <div class="linkSimple col-xs-12">
                <asp:HyperLink ID="hlFlightProcFileName" runat="server" Target="_blank" Style="font-weight: 700; font-size: 15px;" tabindex="0"></asp:HyperLink>
            </div>
            <div class="regulations col-xs-12" style="color: #0047ba; font-weight: 700; font-size: 15px;">
                <asp:CheckBox ID="cbFlightProcFileName" ClientIDMode="Static" runat="server" class="cbflights" />
            </div>
        </div>
        <div id="btnFlightsCon">
            <a class="btnContinue pieFix" href="#" role="button">
                <div class="btnContinueInner">
                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , ContinuButton%>"/>
                </div>
                <div id="btnContinueText" runat="server" class="btnContinueText">
                </div>
            </a>
        </div>
        <div class="floatLeft" style="width: 100%;">
            <a href='#' class="floatLeft clearFlight" onclick="return false;" ng-click='clearSelectedAndJamp()'><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD03_Continue%>"/></a>

        </div>
        <div id="buttonNextPRD03" class="buttonNext"></div>
    </div>
</div>
