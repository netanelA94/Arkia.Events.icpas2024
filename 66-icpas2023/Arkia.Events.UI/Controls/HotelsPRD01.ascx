<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="HotelsPRD01.ascx.cs"
    Inherits="Arkia.Events.LC2014.UI.Controls.PRD01" %>
<%@ Register Src="~/Controls/InfoBoxCtrl.ascx" TagName="InfoBoxCtrl" TagPrefix="Arkia" %>
<div id="PRD01">
    <div ng-controller="ARKIA.WIZARD.HOTELS.hotesCtrl" id="ng_Ctrl_PRD01">
        <div class="orangeHeader pieFix" role="heading" aria-level="2">
            <asp:Literal ID="ltrTitle" runat="server"></asp:Literal>
        </div>
        <div class="mainContentBox pieFix col-xs-12 col-sm-12">
            <div id="hotelsContent" class="hiddenClass">
                <div class="subTitle">
                    <span class="orangeSubTitle">
                        <asp:Literal ID="ltrEventProp" runat="server"></asp:Literal>
                    </span>
                </div>
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
                <div class="hotelsInfoRowH180 col-xs-12 col-sm-12">
                    <div class="hotelsHalfRow col-xs-12 col-sm-12">
                        <div class="col-xs-12">
                            <label for="hotel" class="hotelsInfoLabel col-xs-5 col-sm-4">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD01_SelectHotel%>" /></label>
                            <select id="hotel" class="selectHotels col-xs-6 col-sm-4" aria-required="true" required role="HOTEL_PRD01" data-ng-model="hotelOptions.hotel"
                                data-ng-options="h.HOTEL_NAME for h in hotels" data-ng-change="changeHotels(hotelOptions)"
                                data-ng-disabled="hotels.length == 1">
                                <option value="">
                                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD01_SelectHotel%>" /></option>
                            </select>
                        </div>
                        <div class="col-xs-12">
                            <label for="basis" class="hotelsInfoLabel col-xs-5 col-sm-4">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD01_SelectBase%>" /></label>
                            <select id="basis" class="selectHotels col-xs-6 col-sm-4" aria-required="true" required role="ACOM_PRD01" data-ng-model="hotelOptions.boards"
                                data-ng-options="bb.STR for bb in hotelOptions.hotel.BOARD_BASIS.Value" data-ng-change="changeBoardBasis(hotelOptions.boards)"
                                data-ng-disabled="hotelOptions.hotel.BOARD_BASIS.Value.length == 1">
                                <option value="">
                                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD01_SelectBase%>" /></option>
                            </select>
                        </div>
                        <div class="col-xs-12 col-sm-12">
                            <div>
                                <label for="rooms" class="hotelsInfoLabel col-xs-5 col-sm-4">
                                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD01_SelectNumRooms%>" /></label>
                                <select id="rooms" class="selectHotels col-xs-6 col-sm-4" aria-required="true" required role="ROOM_PRD01" data-ng-model="hotelOptions.rooms_amount"
                                    data-ng-options="rms for rms in rooms_amount_arr" data-ng-change="changeRooms(hotelOptions)"
                                    data-ng-disabled="rooms_amount_arr.length == 1 || adultsCount == 1">
                                    <option value="">0</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <%--<div class="hotelsHalfRow  col-xs-12 col-sm-12">
                        <div class="marketingTextBoxHotel  col-xs-12 col-sm-12" id="marketingTextBox" runat="server">
                            <div class="newLine">
                                <span class="title">
                                    <asp:Literal ID="ltrTextMarketingTitle" runat="server"></asp:Literal>
                                </span>
                            </div>
                            <asp:Literal ID="ltrTextMarketing" runat="server"></asp:Literal>
                        </div>
                    </div>--%>
                </div>
                <%--<div data-ng-if="hotelOptions.hotel.HOTEL_DESC" class="hotelDesc  col-xs-12 col-sm-12">
                    {{hotelOptions.hotel.HOTEL_DESC}}
                </div>--%>
                <div data-ng-if="md ||lg">
                    <div class="greyPanel marginBottom25 col-xs-12 col-sm-12" aria-hidden="true">
                        <div class="roomNum col-xs-12 col-sm-12">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD01_Room%>" />
                        </div>
                        <div class="roomType col-xs-12 col-sm-12" id="roomType">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD01_RoomType%>" />
                        </div>
                        <div class="roomComp col-xs-12 col-sm-12" id="roomComp">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD01_Composition%>" />
                        </div>
                        <div class="roomInfants col-xs-12 col-sm-12" id="roomInfants" data-ng-show="!noInfants">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD01_Babies%>" />
                        </div>
                    </div>
                    <div class="hotelsResultRow col-xs-12 col-sm-12" data-ng-repeat="room in hotelOptions.selectedRooms">
                        <span style="font-size: 0px;">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD01_RoomNum%>" /></span>
                        <label class="roomNumLbl" role="ROOM_NUM">
                            {{$index + 1}}</label>
                        <select class="roomTypeSel" aria-labelledby="roomType" role="ROOM_TYPE_NAME" data-ng-model="room.ROOM" data-ng-options="c.ROOM_TYPE_NAME for c in hotelOptions.hotel.ROOMS.Value"
                            data-ng-change="roomTypeChanged(room)" data-ng-disabled="hotelOptions.hotel.ROOMS.Value.length == 1">
                            <option value="">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD01_SelectRoomType%>" /></option>
                        </select>
                        <select class="roomCompSel" aria-labelledby="roomComp" role="PARTY_TYPE_NAME" data-ng-model="room.PARTY_TYPE"
                            data-ng-if="room.ROOM.ROOMS_NO != 0" data-ng-options="p.PARTY_TYPE_NAME for p in room.ROOM.PARTY_TYPES.Value"
                            data-ng-change="updatePrice(room)" data-ng-disabled="room.ROOM.PARTY_TYPES.Value.length == 1">
                            <option></option>
                        </select>
                        <select class="roomCompSel" role="PARTY_TYPE_NAME" data-ng-if="room.ROOM.ROOMS_NO == 0"
                            disabled="disabled">
                            <option>
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD01_Full%>" /></option>
                        </select>
                        <select class="roomInfantsSel" aria-labelledby="roomInfants" role="MAX_INFANTS" data-ng-model="room.INFANTS" data-ng-options="mx for mx in room.INFANTS_ARR"
                            data-ng-disabled="(room.ROOM.MAX_INFANTS < 1) || (room.ROOM.ROOMS_NO === 0) || noInfants"
                            data-ng-change="updatePrice(room)" data-ng-show="!noInfants">
                        </select>
                        <span class="roomCompPrice" data-ng-if="room.ROOM.ROOMS_NO > 0">{{room.PRICE_FORMATTED}}
                        </span>
                    </div>
                    <div data-ng-if="hotelOptions.selectedRooms" class="col-xs-12 col-sm-12">
                        <%--<span class="childAge">ילד: גילאי 2-12</span>--%>
                        <span data-ng-if="!noInfants" class="infantAge">תינוק: עד גיל שנתיים</span>
                    </div>
                    <div id="infoBoxItems">
                        <Arkia:InfoBoxCtrl ID="infoBox" runat="server" DataSourceId="15" />
                   </div>
                    <div class="hotelComments col-xs-12 col-sm-12">
                        <div class="greyPanel marginBottom25">
                            <div class="hotelCommentsTitle">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD01_Comments%>" />
                            </div>
                        </div>
                        <label id="lblHotelComments1" for="HotelComment" runat="server">
                        </label>
                        <div>
                            <textarea class="col-xs-12 col-sm-12" maxlength="128" id="HotelComment" role="HOTEL_COMMENT"></textarea>
                        </div>
                    </div>
                </div>
                <div data-ng-if="xs || sm">
                    <div class="marginBottom25" data-ng-repeat="room in hotelOptions.selectedRooms">
                        <div class="col-xs-12 col-sm-12">
                            <label class="roomNumLbl roomNum greyPanel" role="ROOM_NUM">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD01_RoomNum%>" />
                                {{$index + 1}}</label>
                        </div>
                        <div class=" col-xs-12 col-sm-12">
                            <label for="roomTypeSel" class="col-xs-4 col-sm-4  roomType">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD01_RoomType%>" /></label>
                            <select id="roomTypeSel" class="roomTypeSel col-xs-8 col-sm-4 col-sm-offset-4" aria-required="true" required role="ROOM_TYPE_NAME" data-ng-model="room.ROOM" data-ng-options="c.ROOM_TYPE_NAME for c in hotelOptions.hotel.ROOMS.Value"
                                data-ng-change="roomTypeChanged(room)" data-ng-disabled="hotelOptions.hotel.ROOMS.Value.length == 1">
                                <option value="">
                                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD01_SelectRoomType%>" /></option>
                            </select>
                        </div>
                        <div class="col-xs-12 col-sm-12">
                            <label for="roomCompSel" class="col-xs-4 col-sm-4  roomComp"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD01_Composition%>" /></label>
                            <select id="roomCompSel" class="roomCompSel col-xs-8 col-sm-4 col-sm-offset-4" aria-required="true" required role="PARTY_TYPE_NAME" data-ng-model="room.PARTY_TYPE"
                                data-ng-if="room.ROOM.ROOMS_NO != 0" data-ng-options="p.PARTY_TYPE_NAME for p in room.ROOM.PARTY_TYPES.Value"
                                data-ng-change="updatePrice(room)" data-ng-disabled="room.ROOM.PARTY_TYPES.Value.length == 1">
                                <option></option>
                            </select>
                             <br />
                            <%--<span class="ages col-xs-8 col-sm-4 col-sm-offset-4">ילד: גילאי 2-12</span>--%>
                        </div>
                        <select class="roomCompSel col-xs-8 col-sm-8" role="PARTY_TYPE_NAME" data-ng-if="room.ROOM.ROOMS_NO == 0"
                            disabled="disabled">
                            <option>
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD01_Full%>" /></option>
                        </select>
                        <div class="roomInfants col-xs-12 col-sm-12" data-ng-show="!noInfants">
                            <label for="roomInfantsSel" class="col-xs-4 col-sm-4">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD01_Babies%>" /></label>
                            <select id="roomInfantsSel" class="roomInfantsSel col-xs-8 col-sm-4 col-sm-offset-4" role="MAX_INFANTS" data-ng-model="room.INFANTS" data-ng-options="mx for mx in room.INFANTS_ARR"
                                data-ng-disabled="(room.ROOM.MAX_INFANTS < 1) || (room.ROOM.ROOMS_NO === 0) || noInfants"
                                data-ng-change="updatePrice(room)">
                            </select>
                            <br />
                            <span class="ages col-xs-8 col-sm-4 col-sm-offset-4">תינוק: עד גיל שנתיים</span>
                        </div>
                        <div class="hotelsResultRow col-xs-12 col-sm-12" data-ng-model="hotelOptions.selectedRooms">
                            <span class="roomCompPrice">{{hotelOptions.selectedRooms[$index].PRICE_FORMATTED}}
                            </span>
                        </div>
                    </div>
                    <div class="hotelComments col-xs-12 col-sm-12">
                        <div class="marginBottom25">
                            <div class="hotelCommentsTitle greyPanel col-xs-12 col-sm-12">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PRD01_Comments%>" />
                            </div>
                        </div>
                        <label id="lblHotelComments2" for="HotelComment" runat="server">
                        </label>
                        <div>
                            <textarea maxlength="128" id="HotelComment" role="HOTEL_COMMENT"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div id="hotelsLoader">
                <div class="loader">
                </div>
            </div>
        </div>
    </div>
    <div id="btnHotelCon">
        <a class="btnContinue pieFix" href="#" role="button">
            <div class="btnContinueInner">
                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , ContinuButton%>" />
            </div>
            <div id="btnContinueText" runat="server" class="btnContinueText">
            </div>
        </a>
    </div>
</div>
