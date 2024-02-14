<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="PCICtrl.ascx.cs" Inherits="Arkia.Events.LC2014.UI.Controls.PCICtrl" %>
<div id="pciDialog" class="col-xs-12  dialogBox hiddenClass pie">
    <div class="orangeHeaderPCI pieFix" role="heading" aria-level="2">
    <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , PCICtrl_Header%>" />
    </div>
    <div id="loginDialogForm" class="col-xs-12  body">
        <div class="margin15">
            <img  class="floatRight" id="pciLockImg" alt="" src="App_Themes/Default/Images/lock.png" />
            <div class="pciInfoText floatLeft " id="pciInfoText" runat="server"></div>
        </div>
        <div class="hiddenClass paymentPCIError" id="paymentPCIError">
            <asp:Literal ID="ltrPaymentError" runat="server"></asp:Literal>
        </div>
        <iframe id="pciIframe" scrolling="no" frameborder="0" height="550" width="100%"></iframe>
    </div>
</div>
