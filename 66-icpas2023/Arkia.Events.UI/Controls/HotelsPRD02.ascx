<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="HotelsPRD02.ascx.cs"
    Inherits="Arkia.Events.LC2014.UI.Controls.PRD02" %>
<div id="PRD02" style="display: none">
    <div ng-controller="ARKIA.WIZARD.HOTELS.hotesCtrl_2" id="ng_Ctrl_PRD02">
        <div class="orangeHeader pieFix" role="heading" aria-level="2">
            <asp:Literal ID="ltrTitle" runat="server"></asp:Literal>
        </div>
        <div class="mainContentBox pieFix col-xs-12 col-sm-12">
            <div class="wrapTitle">
                <span class="orangeSubTitle">
                    <asp:Literal ID="ltrEventProp" runat="server"></asp:Literal>
                </span>
                <ul id="ulComposition">
                    <li id="adultLine" role="adultLine" class="compLi floatRight">
                        <div class="compVi">
                        </div>
                        <span id="adultsCount" role="adultsCount" class="bold14"></span></li>
                    <li id="childLine" role="childLine" class="compLi floatRight hiddenClass">
                        <div class="compVi">
                        </div>
                        <span id="childrencCount" role="childrencCount" class="bold14"></span></li>
                    <li id="infantLine" role="infantLine" class="compLi floatRight hiddenClass">
                        <div class="compVi">
                        </div>
                        <span id="infantsCount" role="infantsCount" class="bold14"></span></li>
                </ul>
            </div>
            <div class="boardsLine bold14">
                <label>
                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD02_Base%>" />:&nbsp;{{checkedOptions.boards.STR}}</label>
            </div>
            <div class="hotelsInfoRow">
                <div class="col-xs-12 col-sm-12 hotelsRowThird">
                    <div class="roomsResultRow" ng-repeat="room in checkedOptions.selectedRooms">
                        <div class="greyPanel marginBottom25" role="heading" aria-level="3">
                            <label class="roomNumLbl">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD02_NumRoom%>" />&nbsp;{{$index + 1}}:</label>
                            <label class="roomNumLbl" role="ROOM_TYPE_NAME">
                                {{room.ROOM.ROOM_TYPE_NAME}}&nbsp;{{room.ROOM.PARTY_TYPE.PARTY_TYPE_NAME}}</label>
                            <a class="clearForm" href="#" role="button" tabindex="0" ng-if="$index == 0" ng-click="clearSelected()">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD02_Clear%>" /></a>
                        </div>
                        <div class="hotelInfoRow col-xs-12">
                            <div ng-repeat="customer in room.room_customers">
                                <label>
                                    {{customer.label}}
                                </label>
                                <select id="roomTypeSel" class="roomTypeSel" aria-required="true" required role="CUSTOMER_PRD02" ng-model="customer.room_customer"
                                    ng-options="customer.fullName for customer in customer.select_arr" data-ng-change="passengersChange(room,customer,checkedOptions.selectedRooms)">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        <div class="col-xs-12 roomPrice">
                            <label>
                                {{room.PARTY_TYPE.PRICE_FORMATTED}}</label>
                        </div>
                    </div>
                </div>
                <div class="marketingTextBox col-xs-12 col-sm-12" id="marketingTextBox" runat="server">
                    <div class="newLine">
                        <span class="title">
                            <asp:Literal ID="ltrTextMarketingTitle" runat="server"></asp:Literal>
                        </span>
                    </div>
                    <asp:Literal ID="ltrTextMarketing" runat="server"></asp:Literal>
                </div>
            </div>
        </div>
    </div>
    <div class="linkSimple margin10">
        <a id="backToPRD01" href="#">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD02_Return%>" /></a>
    </div>
    <div id="buttonNextHotel" class="buttonNext col-xs-12 col-sm-12">
        <a class="btnContinue pieFix" href="#" role="button">
            <div class="btnContinueInner">
                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , ContinuButton%>" />
            </div>
            <div id="btnContinueText" runat="server" class="btnContinueText">
            </div>
        </a>
    </div>
</div>
