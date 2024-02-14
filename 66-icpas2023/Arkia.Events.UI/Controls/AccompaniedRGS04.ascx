<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="AccompaniedRGS04.ascx.cs"
    Inherits="Arkia.Events.LC2014.UI.Controls.RGS04" %>
<%@ Register Src="~/Controls/InfoBoxCtrl.ascx" TagName="InfoBoxCtrl" TagPrefix="Arkia" %>
<div class="pie" data-ng-controller="ARKIA.WIZARD.COMPANIONS.accompaniedCtrl" id="ng_Ctrl_RGS04">
    <div class="orangeHeader pieFix" role="heading" aria-level="2">
        <asp:Literal ID="ltrTitle" runat="server"></asp:Literal>
    </div>
    <div class="mainContentBox pieFix col-sm-12 col-xs-12">
        <Arkia:InfoBoxCtrl ID="infoBox" runat="server" DataSourceId="1" />

        <div data-ng-if="md || lg">
            <div class="greyPanel marginBottom25" aria-hidden="true">
                <div class="title title1">
                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_Title%>"/>
                </div>
                <div id="firstName" class="firstName">
                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_FirstName%>"/>
                </div>
                <div id="lastName" class="lastName">
                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_LastName%>"/>
                </div>
                <div class="dateOfBirth">
                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_BirthDate%>"/>
                </div>
            </div>
            <!-- ROW -->
            <div>
                <div class="accompaniedRow" data-ng-repeat="item in items">
                    <div class="accompaniedRow">
                        <div class="accompaniedDDRow">
                            <select role="TITLE_CODE_ACM" data-ng-model="item.TITLE_CODE_select" data-ng-options="c.cmdtitle for c in cmdtitles">
                                <option value=""><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_Select%>"/></option>
                            </select>
                          <select role="JOB_TITLE_CODE_ACM" style="visibility:hidden" data-ng-model="item.JOB_TITLE_CODE_select" data-ng-options="c.cmdjobtitle for c in cmdjobtitles">
                                <option value=""><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_Select%>"/></option>
                            </select> 
                            <input type="text" class="floatRight" aria-describedby="firstName" role="LATIN_FIRST_NAME_ACM" data-ng-model="item.LATIN_FIRST_NAME"
                                data-ng-model-onblur data-ng-change="reset()" />
                            <input type="text" class="floatRight" aria-describedby="lastName" role="LATIN_LAST_NAME_ACM" data-ng-model="item.LATIN_LAST_NAME"
                                data-ng-model-onblur data-ng-change="reset()" />
                            <select role="YEAR_ACM" class="floatRight" data-ng-model="item.YEAR" data-ng-options="c for c in cmdyears"
                                data-ng-change="reset()">
                                <option value=""><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_Year%>"/></option>
                            </select>
                            <select role="MONTH_ACM" class="floatRight" data-ng-model="item.MONTH" data-ng-options="c for c in cmdmonths"
                                ng-change="reset()">
                                <option value=""><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_Month%>"/></option>
                            </select>
                            <select role="DAY_ACM" class="floatRight" data-ng-model="item.DAY" data-ng-options="c for c in cmddays"
                                data-ng-change="reset()">
                                <option value=""><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_Day%>"/></option>
                            </select>
                            <a href="#" role="accompDelete" ng-click="delete_item(item)"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_Delete%>"/></a>
                        </div>
                        <div id="passportBox1" runat="server" class="accompaniedDDRow passportBox1">
                            <div class="floatRight">
                                <input type="text" role="PASSPORT_ACM" data-ng-model="item.PASSPORT_NO"/>
                                <span class="accPassLbl"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_PassportExp%>"/></span>
                            </div>
                            <select role="PASSPORT_YEAR_ACM" data-ng-model="item.PASSPORT_YEAR" data-ng-options="c for c in cmdPyears"
                                data-ng-change="reset()">
                                <option value=""><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_Year%>"/></option>
                            </select>
                            <select role="PASSPORT_MONTH_ACM" data-ng-model="item.PASSPORT_MONTH" data-ng-options="c for c in cmdPmonths"
                                data-ng-change="reset()">
                                <option value=""><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_Month%>"/></option>
                            </select>
                            <select role="PASSPORT_DAY_ACM" data-ng-model="item.PASSPORT_DAY" data-ng-options="c for c in cmdPdays"
                                data-ng-change="reset()">
                                <option value=""><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_Day%>"/></option>
                            </select>
                        </div>

                    </div>

                </div>
            </div>
            <!-- END ROW -->
            <div class="accSolidSep">
            </div>
        </div>
        <div data-ng-if="xs || sm">

            <div class="accompaniedRow" data-ng-repeat="item in items">
                <label class="greyPanel" role="heading" aria-level="3">
                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_AccNum%>"/>
                            {{$index + 1}}</label>
                <a href="#" role="accompDelete" ng-click="delete_item(item)" tabindex="0"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_Delete%>"/></a>
                <div class="col-sm-12 col-xs-12 personalInfoRow">
                    <label id="lbl_title" class="label title title1 col-xs-3 col-sm-3">
                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_Title%>"/>
                    </label>
                    <select aria-describedby="lbl_title" role="TITLE_CODE_ACM" data-ng-model="item.TITLE_CODE_select" data-ng-options="c.cmdtitle for c in cmdtitles">
                        <option value=""><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_Select%>"/></option>
                    </select>
                    <select aria-describedby="lbl_title" role="JOB_TITLE_CODE_ACM" data-ng-model="item.JOB_TITLE_CODE_select" data-ng-options="c.cmdjobtitle for c in cmdjobtitles">
                        <option value=""><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_Select%>"/></option>
                    </select>
                </div>
                <div class="col-sm-12 col-xs-12 personalInfoRow">
                    <label id="lbl_firstName" class="label firstName col-xs-3 col-sm-3">
                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_FirstName%>"/>
                    </label>
                    <input type="text" class="floatRight col-xs-8 col-sm-4" aria-describedby="lbl_firstName" role="LATIN_FIRST_NAME_ACM" data-ng-model="item.LATIN_FIRST_NAME"
                        data-ng-model-onblur data-ng-change="reset()" onkeyup="$(this).val($(this).val().replace(/[^a-zA-Z]/g, ''));"/>
                </div>
                <div class="col-sm-12 col-xs-12 personalInfoRow">
                    <label id="lbl_lastName" class="label lastName col-xs-3 col-sm-3">
                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_LastName%>"/>
                    </label>
                    <input type="text" class="floatRight col-xs-8 col-sm-4" aria-describedby="lbl_lastName" role="LATIN_LAST_NAME_ACM" data-ng-model="item.LATIN_LAST_NAME"
                        data-ng-model-onblur data-ng-change="reset()" onkeyup="$(this).val($(this).val().replace(/[^a-zA-Z]/g, ''));"/>
                </div>
                <div class="col-xs-12 col-sm-12 personalInfoRow">
                    <label class="label label2 dateOfBirth col-xs-3 col-sm-3">
                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_BirthDate%>"/>
                    </label>
                    <div class="col-sm-8 col-xs-8 accompanyDob">
                        <select role="YEAR_ACM" class="floatRight" data-ng-model="item.YEAR" data-ng-options="c for c in cmdyears"
                            data-ng-change="reset()">
                            <option value=""><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_Year%>"/></option>
                        </select>
                        <select role="MONTH_ACM" class="floatRight" data-ng-model="item.MONTH" data-ng-options="c for c in cmdmonths"
                            ng-change="reset()">
                            <option value=""><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_Month%>"/></option>
                        </select>
                        <select role="DAY_ACM" class="floatRight" data-ng-model="item.DAY" data-ng-options="c for c in cmddays"
                            data-ng-change="reset()">
                            <option value=""><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_Day%>"/></option>
                        </select>

                    </div>
                </div>
                <div id="passportBox2" runat="server" class="col-xs-12 col-sm-12">
                    <div class="col-xs-12 col-sm-12 personalInfoRow">
                        <label id="lbl_passport" class="label col-xs-3 col-sm-3">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_passportNum%>"/>
                        </label>
                        <div class="col-sm-4 col-xs-8">
                            <input type="text" class="col-xs-12 col-sm-12" aria-describedby="lbl_passport" role="PASSPORT_ACM" data-ng-model="item.PASSPORT_NO" />

                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 personalInfoRow">
                        <label class="label label2 dateOfBirth col-xs-3 col-sm-3">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_PassportExp%>"/>
                        </label>

                        <div id="accompanyDob" class="col-sm-8 col-xs-8 accompanyDob">
                            <select role="PASSPORT_YEAR_ACM" data-ng-model="item.PASSPORT_YEAR" data-ng-options="c for c in cmdPyears"
                                data-ng-change="reset()">
                                <option value=""><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_Year%>"/></option>
                            </select>
                            <select role="PASSPORT_MONTH_ACM" data-ng-model="item.PASSPORT_MONTH" data-ng-options="c for c in cmdPmonths"
                                data-ng-change="reset()">
                                <option value=""><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_Month%>"/></option>
                            </select>
                            <select role="PASSPORT_DAY_ACM" data-ng-model="item.PASSPORT_DAY" data-ng-options="c for c in cmdPdays"
                                data-ng-change="reset()">
                                <option value=""><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_Day%>"/></option>
                            </select>
                        </div>
                    </div>
                </div>
                <%--<div class="accSolidSep"></div>--%>
            </div>
        </div>
    </div>
    <div id="accompaniedAdd">
        <div class="accompaniedAdd">
        </div>
        <a href="#" class="accompaniedAddLink" name="accompAdd" id="accompAdd" data-ng-click="addItem()" role="button"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS04_AddCom%>"/></a>
    </div>
  <%-- todelete for dev--%>
<%--    <div data-ng-if="isDev" class="marginTop10 floatRight">
        <label class="marginLeft10">בחר מספר מלווים</label>
        <select id="accNumSelect" style="width:50px;">
            <option data-ng-value="0">0</option>
            <option data-ng-value="1">1</option>
            <option  data-ng-value="2">2</option>
            <option  data-ng-value="3">3</option>
            <option  data-ng-value="4">4</option>
            <option  data-ng-value="5">5</option>
        </select>
    </div>--%>
    <div class="buttonNext col-xs-12 col-sm-12">
        <a class="btnContinue pieFix" href="#" role="button">
            <div class="btnContinueInner">
                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , ContinuButton%>"/>
            </div>
            <div id="btnContinueText" runat="server" class="btnContinueText">
            </div>
        </a>
    </div>
</div>
