<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="ThankYouPMN04.aspx.cs" Inherits="Arkia.Events.LC2014.UI.PMN04" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div id="PMN04" class="orangeHeader pieFix" role="heading" aria-level="2">
        <asp:Literal ID="ltrTitle" runat="server"></asp:Literal>
    </div>
    <div id="main" class="mainContentBox mainContentBoxExt pieFix">
        <h1 class="title">
            <asp:Label ID="lblTitleFinal" runat="server" /></h1>
        <h3>
            <asp:Literal ID="ltrTextFinal" runat="server"></asp:Literal></h3>
    </div>
    <%--<ul id="linkGetDocsByMail" runat="server" class="linkCatalog">
        <li class="envelop floatRight"></li>
        <li class="floatRight"><a id="hlGetDocsByMail" role="button" aria-haspopup="true" href="#" onclick="return false;">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN04_SendToMail%>" /></a>
        </li>
        <li class="blueArrow"></li>
    </ul>--%>
    <div class="clear">
    </div>
    <div id="aAa">
        <div id="sendDocsDialog" class="dialogBox sendDocsDialog pie hiddenClass">
            <div class="orangeHeaderPCI pieFix" role="heading" aria-level="2">
                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN04_SendToMail2%>" />
            </div>
            <div class="body">
                <p>
                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN04_TXTEnterEmail%>" />
                </p>
                <div class="innerBox pie">
                    <div id="validBox" class="validation hiddenClass" role="alert">
                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN04_EnterCorrectEmail%>" />
                    </div>

                    <input type="text" id="txtDocsToMail" class="txtSendToMail emailField" maxlength="32" aria-label="mail" aria-required="true" required />
                    <div class="envelop floatRight"></div>
                </div>
                <input type="button" id="btnSendDocs" class="sendBtn floatLeft pie" value="שלח" />
            </div>
        </div>
    </div>
</asp:Content>
