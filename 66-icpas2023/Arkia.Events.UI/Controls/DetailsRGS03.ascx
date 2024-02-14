<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="DetailsRGS03.ascx.cs"
    Inherits="Arkia.Events.LC2014.UI.Controls.RGS03" %>
<%@ Register Src="~/Controls/InfoBoxCtrl.ascx" TagName="InfoBoxCtrl" TagPrefix="Arkia" %>
<div class="orangeHeader pieFix" role="heading" aria-level="2">
    <asp:Literal ID="ltrTitle" runat="server"></asp:Literal>
</div>
<div class="mainContentBox pieFix col-sm-12 col-xs-12" data-ng-controller="ARKIA.WIZARD.REGISTRATION.registrationCtrl" id="ng_Ctrl_RGS03">
    <Arkia:InfoBoxCtrl ID="infoBox" runat="server" DataSourceId="10" />
    <!--right-->
    <div class="personalInfoRow col-sm-6 col-xs-12 col-md-6 col-lg-6">
        <label id="lbl_title" title="תואר" class="label">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_Title%>" /><span class="reqField">*</span></label>
        <select name="title" id="title" class="input selectSmall" aria-required="true" required role="TITLE_CODE" data-ng-model="item.TITLE_CODE_select" data-ng-options="item as item.cmdtitle for item in cmdtitles track by item.value">
            <option value="">
                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_Select%>" /></option>
        </select>
        <select name="jobtitle" id="jobtitle" style="visibility: hidden" class="input selectMed" role="JOB_TITLE_CODE" data-ng-model="item.JOB_TITLE_CODE_select" data-ng-options="item as item.cmdjobtitle for item in cmdjobtitles track by item.value">
            <option value="">
                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_Select%>" /></option>
        </select>
    </div>
    <!--left-->
    <div class="personalInfoRow col-sm-6 col-xs-12 col-md-6 col-lg-6">
        <label id="lbl_id" title="תעודת זהות" class="label">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_ID%>" /><span class="reqField">*</span></label>
        <input name="id" id="id" type="text" class="idDetails input" aria-describedby="lbl_id" aria-required="true" required role="ID_NO" maxlength="9" runat="server" disabled="disabled" />
    </div>
    <!--right-->
    <div class="personalInfoRow col-sm-6 col-xs-12 col-md-6 col-lg-6">
        <label id="lbl_firstname" title="שם פרטי" class="label">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_FirstName%>" /><span class="reqField">*</span></label>
        <input name="firstname" id="firstname" type="text" class="firstnameDetails input" maxlength="32" aria-describedby="lbl_firstname req1" aria-required="true" required role="FIRST_NAME"
            runat="server" disabled="disabled" onkeyup="$(this).val($(this).val().replace(/[^א-ת\ ']/g, ''));" />
        <br />
        <span id="req1" class="reqFieldSmall">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_Hebrew%>" /></span>
    </div>
    <!--left-->
    <div class="personalInfoRow col-sm-6 col-xs-12 col-md-6 col-lg-6">
        <label id="lbl_lastname" title="שם משפחה" class="label">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_LastName%>" /><span class="reqField">*</span></label>
        <input name="lastname" type="text" id="lastname" class="lastnameDetails input"  maxlength="32" aria-describedby="lbl_lastname req1"
            onkeyup="$(this).val($(this).val().replace(/[^א-ת\ ']/g, ''));" aria-required="true" required role="LAST_NAME" runat="server" disabled="disabled" />
        <br />
        <span class="reqFieldSmall">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_Hebrew%>" /></span>
    </div>
    <!--right-->
    <div class="personalInfoRow col-sm-6 col-xs-12 col-md-6 col-lg-6">
        <label id="lbl_firstname_eng" title="שם פרטי" class="label">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_FirstName%>" /><span class="reqField">*</span></label>
        <input name="firstname_eng" id="firstname_eng" type="text" class="input"  maxlength="32" role="LATIN_FIRST_NAME"
            aria-required="true" required aria-describedby="lbl_firstname_eng req2" onkeyup="$(this).val($(this).val().replace(/[^a-zA-Z ]/g, ''));" />
        <br />
        <span id="req2" class="reqFieldSmall">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_Foreign%>" /></span>
    </div>
    <!--left-->
    <div class="personalInfoRow col-sm-6 col-xs-12 col-md-6 col-lg-6">
        <label id="lbl_lastname_eng" title="שם משפחה" class="label">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_LastName%>" /><span class="reqField">*</span></label>
        <input name="lastname_eng" id="lastname_eng" type="text" class="input"  maxlength="32" role="LATIN_LAST_NAME"
            aria-required="true" required aria-describedby="lbl_lastname_eng req2" onkeyup="$(this).val($(this).val().replace(/[^a-zA-Z ]/g, ''));" />
        <br />
        <span class="reqFieldSmall">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_Foreign%>" /></span>
    </div>
    <!--right-->
    <div class="personalInfoRow col-sm-6 col-xs-12 col-md-6 col-lg-6">
        <label id="lbl_phone" title="טלפון" class="label">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_Phone%>" /><span class="reqField">*</span></label>
        <div dir="ltr">
            <input name="area_code" id="area_code" type="text" class="area_codeDetails input input10" role="AREA_CODE1" maxlength="3" runat="server" aria-required="true" required onkeyup="$(this).val($(this).val().replace(/[^0-9\']/g, ''));" />
            <input name="phone" id="phone" type="text" class="phoneDetails input input30" aria-describedby="lbl_phone" role="PHONE1" maxlength="7" runat="server" aria-required="true" required onkeyup="$(this).val($(this).val().replace(/[^0-9\']/g, ''));" />
        </div>
    </div>
    <!--left-->
    <div class="personalInfoRow col-sm-6 col-xs-12 col-md-6 col-lg-6">
        <label id="lbl_phone_ext" title="טלפון נוסף" class="label">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_AdditionalTelephone%>" /></label>
        <div dir="ltr">
            <input name="area_code_ext" id="area_code_ext" type="text" class="input input10"
                role="AREA_CODE2" maxlength="3" onkeyup="$(this).val($(this).val().replace(/[^0-9\']/g, ''));" />
            <input name="phone_ext" id="phone_ext" type="text" class="input input30" aria-describedby="lbl_phone_ext" role="PHONE2"
                maxlength="7" onkeyup="$(this).val($(this).val().replace(/[^0-9\']/g, ''));" />
        </div>
    </div>
    <!--right-->
    <div class="personalInfoRow col-sm-6 col-xs-12 col-md-6 col-lg-6">
        <label id="lbl_email" title="דואל" class="label">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_Email%>" /><span class="reqField">*</span></label>
        <input name="email" id="email" type="text" class="emailDetails input" aria-describedby="lbl_email" role="EMAIL" runat="server" disabled="disabled" aria-required="true" required />
    </div>
    <!--left-->
<%--    <div class="personalInfoRow col-sm-6 col-xs-12 col-md-6 col-lg-6">
        <label id="lbl_fax" title="פקס" class="label">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_Fax%>" /></label>
        <div dir="ltr">
            <input name="area_code_fax" id="area_code_fax" type="text" class="input input10"
                role="AREA_CODE_FAX" maxlength="3" onkeyup="$(this).val($(this).val().replace(/[^0-9\']/g, ''));" />
            <input name="fax" id="fax" class="input input30" type="text" aria-describedby="lbl_fax" role="FAX"
                maxlength="7" onkeyup="$(this).val($(this).val().replace(/[^0-9\']/g, ''));" />
        </div>
    </div>--%>
    <div id="passportBox" runat="server" visible="false">
        <!--right-->
        <div class="personalInfoRow col-sm-6 col-xs-12 col-md-6 col-lg-6">
            <label id="lbl_passport" title="מספר דרכון" class="label">
                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_Passport%>" /><span class="reqField">*</span></label>
            <input name="passport" id="passport" type="text" class="input" aria-describedby="lbl_passport" role="PASSPORT"
                aria-required="true" required onkeyup="$(this).val($(this).val().replace(/[^0-9\']/g, ''));" />
        </div>
        <!--left-->
        <div class="personalInfoRow col-sm-6 col-xs-12 col-md-6 col-lg-6">
            <label id="lbl_passport" title="תוקף דרכון" class="label label2">
                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_PassportExp%>" /><span class="reqField">*</span></label>
            <select id="passportYear" role="PASSPORT_YEAR" data-ng-options="c for c in cmdPyears" ng-model="item.PassYEAR" class="input dateSelect" aria-required="true" required>
                <option value="">
                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_Year%>" /></option>
            </select>
            <select id="passportMonth" role="PASSPORT_MONTH" data-ng-options="c for c in cmdPmonths" ng-model="item.PassMONTH" class="input dateSelect" aria-required="true" required>
                <option value="">
                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_Month%>" /></option>
            </select>
            <select id="passportDay" role="PASSPORT_DAY" data-ng-options="c for c in cmdPdays" ng-model="item.PassDAY" class="input dateSelect" aria-required="true" required>
                <option value="">
                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_Day%>" /></option>
            </select>
        </div>
        <!--right-->
        <div class="personalInfoRow col-sm-6 col-xs-12 col-md-6 col-lg-6">
            <label id="lbl_dob" title="תאריך לידה" class="label label2">
                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_BirthDate%>" /><span class="reqField">*</span></label>
            <select id="DOBYear" role="YEAR" data-ng-options="c for c in cmdyears" ng-model="item.YEAR" class="input dateSelect" aria-required="true" required>
                <option value="">
                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_Year%>" /></option>
            </select>
            <select id="DOBMonth" role="MONTH" data-ng-options="c for c in cmdmonths" ng-model="item.MONTH" class="input dateSelect" aria-required="true" required>
                <option value="">
                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_Month%>" /></option>
            </select>
            <select id="DOBDay" role="DAY" data-ng-options="c for c in cmddays" ng-model="item.DAY" class="input dateSelect" aria-required="true" required>
                <option value="">
                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_Day%>" /></option>
            </select>
        </div>
    </div>
    <%-- <div class="personalInfoRow">
        <label id="lbl_district" title="מחוז" class="label">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_district%>" /><span class="reqField">*</span></label>
        <select name="district" id="district" class="input" aria-describedby="lbl_district" role="DISTRICT" aria-required="true" required>
            <option value="">
                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_Select%>" /></option>
            <option value="תל אביב והמרכז">
                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_TelAviv%>" /></option>
            <option value="חיפה">
                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_Haifa%>" /></option>
            <option value="ירושלים">
                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_Jerusalem%>" /></option>
            <option value="דרום">
                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_South%>" /></option>
            <option value="צפון">
                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_North%>" /></option>
        </select>
    </div>--%>
    <%--<div class="personalInfoRow col-sm-6 col-xs-12 col-md-6 col-lg-6">
        <label for="comment_1" title="מקום עבודה" class="label">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_Job%>" /></label>
        <input name="comment_1" id="comment_1" type="text" class="comment_1 input" role="COMMENT_1"
            maxlength="16" />
    </div>--%>
    <%--  <div class="personalInfoRow col-sm-6 col-xs-12 col-md-6 col-lg-6">
        <label for="comment_2" title="תפקיד" class="label">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_Job_title%>" />
        </label>
        <input name="comment_2" id="comment_2" type="text" class="comment_2 input" role="COMMENT_2"
            maxlength="16"/>
    </div>--%>

    <div class="personalInfoRow" id="divCPA">
        <label title="רואה חשבון" class="label">
            רואה חשבון<span class="reqField">*</span></label>
        <select id="CPA" role="CPA" tabindex="17" class="input selectSmall">
            <option value="">בחר</option>
            <option value="7">כן</option>
            <option value="8">לא</option>
        </select>
    </div>

   <%-- <div class="personalInfoRow" id="divRoute">
        <label title="מסלול" class="label">
            בחירת מסלול<span class="reqField">*</span></label>
        <select id="route" role="ROUTE" tabindex="18" class="input selectSmall">
            <option value="">בחר</option>
            <option value="סמנכל">סמנכ"ל</option>
            <option value="רגיל">רגיל</option>
        </select>
    </div>--%>

    <div class="mrgTop20px">
        <label title="שדות חובה בטופס" class="label">
            <span class="reqField">*</span>
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS03_RequiredFields%>" /></label>
    </div>
</div>
<div class="buttonNext col-sm-12 col-xs-12" id="buttonNextDetails">
    <a class="btnContinue pieFix " href="#" role="button">
        <div class="btnContinueInner">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , ContinuButton%>" />
        </div>
        <div id="btnContinueText" runat="server" class="btnContinueText">
        </div>
    </a>
</div>
