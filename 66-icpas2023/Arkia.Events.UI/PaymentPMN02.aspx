<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="PaymentPMN02.aspx.cs" Inherits="Arkia.Events.LC2014.UI.PMN02" %>

<%@ Register Src="~/Controls/InfoBoxCtrl.ascx" TagName="InfoBoxCtrl" TagPrefix="Arkia" %>
<%@ Register Src="~/Controls/PCICtrl.ascx" TagName="PCICtrl" TagPrefix="Arkia" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="actionBar">
        <div class="msgBox msgBoxOuter hiddenClass pieFix">
            <a href="#" class="close" role="button">X</a>
            <div class="errorFlag">
            </div>
            <div class="content">
            </div>
        </div>
    </div>
    <div id="PMN02" class="orangeHeader pieFix" role="heading" aria-level="2">
        <span id="titleCcText">
            <asp:Literal ID="ltrTitleCC" runat="server"></asp:Literal></span> <span id="titleText"
                class="hiddenClass">
                <asp:Literal ID="ltrTitle" runat="server"></asp:Literal></span>
    </div>
    <div id="main" class="mainContentBox pieFix">
        <div class="paymentBox">
            <div class="col-xs-12  paymentRightBox">
                <div id="ccPaymentInfoBox">
                    <Arkia:InfoBoxCtrl ID="infoBoxCC" runat="server" DataSourceId="9" />
                </div>
                <div class="TotalPrice pie marginBottom10">
                    <span>
                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN02_TotalOrderValue%>" /></span>
                    <div class="totalPriceMark pie" role="alert">
                        <span class="bold">
                            <asp:Literal ID="ltrTotalPrice" runat="server"></asp:Literal></span>
                    </div>
                </div>
                <div id="tokensBox" runat="server" visible="false">
                    <div id="tokensList" style="margin-right: 5px; margin-bottom: 10px; display: inline-block; width: 100%;">

                        <asp:ListView runat="server" ID="lvPayment" ItemPlaceholderID="itemContainer"
                            OnItemDataBound="lvPayment_ItemDataBound">
                            <LayoutTemplate>
                                <ul>
                                    <asp:PlaceHolder runat="server" ID="itemContainer" />
                                </ul>
                            </LayoutTemplate>
                            <ItemTemplate>
                                <li id="liPmtToken" runat="server" class="pmtToken" style="margin-bottom: 10px; font-size: 14px;">
                                    <label class="ltrTokenText defaultBoldLabel" style="width: 350px; display: inline-block;">
                                        <asp:Literal ID="ltrTokenText" runat="server"></asp:Literal>
                                    </label>
                                    <div class="txtTokenVal" style="float: left; margin-left: 40px;">
                                        <asp:TextBox ID="txtTokenVal" CssClass="txtTokenVal" runat="server" tokenVal="0" Style="width: 70px; height: 25px;"></asp:TextBox>

                                        <label class="defaultBoldLabel">
                                            <asp:Literal ID="ltrTokenCurrency" runat="server"></asp:Literal>
                                        </label>
                                    </div>

                                    <label class="ltrPmtToken defaultBoldLabel" style="display: block; line-height: 2; margin-right: 20px">
                                        <asp:Literal ID="ltrPmtToken" runat="server"></asp:Literal>
                                    </label>
                                </li>
                            </ItemTemplate>
                        </asp:ListView>
                        <label id="updateTokenLink" style="font-weight: 700; color: #008476; float: left; margin-left: 30px; font-size: 14px; text-decoration: underline; cursor: pointer;">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN02_Update%>" /></label>
                    </div>
                    <div id="balancePaymentCC" runat="server" class="TotalPrice pie marginBottom10" visible="false">
                        <span>
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN02_BalanceDue%>" /></span>
                        <div id="balancePriceBox" runat="server" class="totalPriceMark pie balancePrice">
                            <span class="bold">
                                <asp:Literal ID="ltrBalancePrice" runat="server"></asp:Literal></span>
                            <input id="hfBalancePrice" type="hidden" />
                        </div>
                    </div>
                </div>
                <div id="otherPaymentMethodsBox" class="hiddenClass">
                    <Arkia:InfoBoxCtrl ID="infoBox" runat="server" DataSourceId="5" />
                    <div class="paymentTypes col-xs-12">
                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN02_Payment%>" />
                    </div>
                    <div class="paymentType col-xs-12">
                        <!-- //according user requiernent i've disabled other payment methode
                        <input class="col-xs-1" id="rdVoucher" type="radio" name="paymentType" value="VOUCHER" />
                        <label class="defaultBoldLabel col-xs-11" for="rdVoucher">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN02_Check%>" /></label> -->
                        <input class="col-xs-1 col-xs-11" id="rbBank" type="radio" name="paymentType" value="BANK" />
                        <label class="defaultBoldLabel col-xs-11" for="rbBank">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN02_EFT%>" /></label>
                        <!--
                        <input class="col-xs-1" id="rbDivide" type="radio" name="paymentType" value="DIVIDE" />
                        <label class="defaultBoldLabel col-xs-11" for="rbBank">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN02_PaymentDistribution%>" /></label>-->
                    </div>
                    <div class="paymentRow paymentSecurity col-xs-12">
                        <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN02_CardDetailsSecurity%>" />
                    </div>
                </div>
                <div id="paymentByCCBox" class="col-xs-12">
                    <div class="paymentRow col-xs-12">
                        <label for="txtCardHolderName" class="col-xs-6 defaultBoldLabel">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN02_CardholderName%>" /></label>
                        <input id="txtCardHolderName" type="text" class="col-xs-6 long" aria-required="true" required />
                    </div>
                    <div class="col-xs-12 paymentRow">
                        <label for="txtCCNumberPCI" class="col-xs-6 defaultBoldLabel">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN02_CardNumber%>" /></label>
                        <input id="txtCCNumberPCI" type="text" class="col-xs-6 long pciCC" readonly="readonly" title="לחץ על מנת לפתוח את חלונית התשלום" />
                        <input hidden="hidden" id="hfToken" class="hiddenClass" />
                        <input hidden="hidden" id="hfTxnToken" class="hiddenClass" />
                    </div>
                    <%--<div class="col-xs-12 paymentRow">
                        <label for="txtCvv" class="col-xs-6 defaultBoldLabel">
                            CVV</label>
                        <input id="txtCvv" type="text" class="col-xs-6 short" maxlength="4" aria-required="true" required />
                    </div>--%>
                    <%--<div class="paymentRow col-xs-12">
                        <label class="col-xs-6 defaultBoldLabel">
                            מסלול תשלום</label>
                        <select class="col-xs-6" id="ddlPaymnetMethod">
                        </select>
                    </div>--%>
                    <div class="paymentRow paymentsNum col-xs-12">
                        <label for="ddlPaymentsNum" class="col-xs-6 defaultBoldLabel">
                            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN02_Payments%>" /></label>
                        <select class="col-xs-6" id="ddlPaymentsNum">
                        </select>
                    </div>
                    <div id="invoicePropBox" class="marginTop10 col-xs-12">
                        <div class="flightSeparator">
                        </div>
                        <div>
                            <div class="col-xs-12 paymentRow">
                                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN02_InvoiceForOtherName%>" />
                            </div>
                            <div class="col-xs-12 paymentRow">
                                <label for="txtInvoiceCustomerName" class="col-xs-6 defaultBoldLabel">
                                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN02_Name%>" /></label>
                                <input id="txtInvoiceCustomerName" type="text" class="col-xs-6 long" />
                            </div>
                            <div class="col-xs-12 paymentRow">
                                <label for="txtVatCaseRefNo" class="col-xs-6 defaultBoldLabel">
                                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN02_ID%>" /></label>
                                <input id="txtVatCaseRefNo" type="text" class="col-xs-6 long" />
                            </div>
                            <div class="col-xs-12 paymentRow">
                                <label for="txtInvoiceEmailSend" class="col-xs-6 defaultBoldLabel">
                                    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN02_AddressToSendInvoice%>" /></label>
                                <input id="txtInvoiceEmailSend" type="text" class="col-xs-6 long" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="marketingTextBoxPayment">
                <div class="newLine">
                    <span class="title">
                        <asp:Literal ID="ltrTextMarketingTitle" runat="server"></asp:Literal></span>
                </div>
                <div class="content">
                    <div>
                        <asp:Literal ID="ltrTextMarketing" runat="server"></asp:Literal>
                    </div>
                    <div class="last">
                        <asp:Literal ID="ltrPaymentNote" runat="server"></asp:Literal>
                    </div>
                </div>
                <img src="App_Themes/Default/Images/secure.png" id="secureSiteLogo" alt="" />
            </div>
        </div>
        <Arkia:PCICtrl ID="pciCtrl" runat="server" />
    </div>
    <ul id="linkPayment" class="linkCatalog">
        <li><a id="hlotherPayment" href="#">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN02_PaymentByOther%>" /></a> </li>
        <li><a id="hlPayment" href="#" class="hiddenClass">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PMN02_PaymentByCard%>" /></a> </li>
        <li class="blueArrow"></li>
    </ul>
    <a id="btnOtherPayment" class="btnContinue pieFix hiddenClass" href="#" role="button">
        <div class="btnContinueInner">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , ContinuButton%>" />
        </div>
        <div id="btnContinueCCText" runat="server" class="btnContinueText">
        </div>
    </a>
    <a id="btnPayment" class="btnContinue pieFix" href="#" role="button">
        <div class="btnContinueInner">
            <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , ContinuButton%>" />
        </div>
        <div id="btnContinueText" runat="server" class="btnContinueText">
        </div>
    </a>
    <div id="loader" class="loaderClick hiddenClass">
    </div>
</asp:Content>
