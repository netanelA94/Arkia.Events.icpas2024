<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="EventCyclesRGS02.aspx.cs" Inherits="Arkia.Events.LC2014.UI.RGS02" %>
<%@ Register Src="~/Controls/InfoBoxCtrl.ascx" TagName="InfoBoxCtrl" TagPrefix="Arkia" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="actionBar">
        <div class="msgBox msgBoxOuter hiddenClass pie">
            <a href="#" class="close" role="button">X</a>
            <div class="errorFlag">
            </div>
            <div class="content">
            </div>
        </div>
    </div>
    <div id="RGS02" class="orangeHeader pieFix" role="heading" aria-level="2">
        <asp:Literal ID="ltrTitle" runat="server"></asp:Literal>
    </div>
    <div id="main" class="mainContentBox mainContentBoxExt pieFix">
        <div class="lapWrapper">
            <asp:ListView runat="server" ID="lvEventCycles" ItemPlaceholderID="itemContainer"
                OnItemDataBound="lvEventCycles_ItemDataBound">
                <LayoutTemplate>
                    <ul>
                        <asp:PlaceHolder runat="server" ID="itemContainer" />
                    </ul>
                </LayoutTemplate>
                <ItemTemplate>
                    <li role="presentation">
                        <div class="lapRbt">
                            <asp:RadioButton ID="rbCycle" runat="server" /></div>
                        <div class="lapName">
                            <asp:Literal ID="ltrCycleText" runat="server"></asp:Literal></div>
                    </li>
                </ItemTemplate>
            </asp:ListView>
        </div>
        <div class="marketingTextBox col-sm-12 col-xs-12">
            <div class="newLine">
                <span class="title">
                    <asp:Literal ID="ltrTextMarketingTitle" runat="server"></asp:Literal></span>
            </div>
            <asp:Literal ID="ltrTextMarketing" runat="server"></asp:Literal>
        </div>
    </div>
     <%--<div class="mWrapper col-sm-12 col-xs-12">
        <div class="mWrapperDiv" style="margin: 25px 60px;">
            <div class="mWrapperTitle">
                <asp:Literal ID="ltrRoommates" runat="server"></asp:Literal>
                </div> <div  class="roommateClear" role="button" tabindex="0"><asp:Literal runat="server" Text="<%$ Resources:LocalizedText , RGS02_Clear%>"/></div>
            <div class="marketingText">
               <arkia:infoboxctrl id="infoBox" runat="server" datasourceid="2" /></div>
            <div class="roommatesBox">
                <div class="roommatesRowC">
                    <span id="lblRoommates" class="lbl"> <asp:Literal ID="ltrRoommatesNo" runat="server"></asp:Literal></span><span>
                        <asp:DropDownList ID="ddlRoommates" CssClass="ddlRoommates" runat="server" EnableViewState="true" Style="width: 80px;" aria-describedby="lblRoommates">
                            <asp:ListItem Value="0" Text="0" Selected="True"> </asp:ListItem>
                            <asp:ListItem Value="1" Text="1"> </asp:ListItem>
                            <asp:ListItem Value="2" Text="2"> </asp:ListItem>
                        </asp:DropDownList>
                    </span>
                </div>
                <div class="roommatesRow rr1">
                    <div class="row col-sm-12 col-xs-12">
                        <div class="IdNoExists" role="alert" >
                            <asp:Label ID="Id1NoExists" runat="server" Visible="false"></asp:Label>
                        </div>
                   </div>
                        <span id="lblRoommate1Name" class="lbl"><asp:Literal ID="ltrRoommatesName1" runat="server"></asp:Literal></span>
                        <span><asp:TextBox ID="txtRoommate1Name" runat="server" aria-describedby="lblRoommate1Name" onpaste="return false"></asp:TextBox> </span>
                    <div id="RoommatePhone1" runat="server" class="displayI " visible="false">
                        <span id="lblM" class="lbl lblM"><asp:Literal ID="ltrRoommatesPhone1" runat="server"></asp:Literal>  </span>
                        <span class="phoneWrapper">
                        <span><asp:TextBox ID="txtRoommate1Phone" runat="server" maxlength="7" class="roommatePhone " aria-labeledby="lblM"></asp:TextBox></span>
                        <span><asp:TextBox ID="txtRoommate1Area_code" runat="server" maxlength="3" class="roommateArea_code "></asp:TextBox></span>
                        </span>
                    </div>
                    <div id="RoommateId1" runat="server" class="displayI">
                         <span id="lbl" class="lbl"><asp:Literal ID="ltrRoommatesId1" runat="server"></asp:Literal></span>
                         <span><asp:TextBox ID="txtRoommate1Id" aria-describedby="lbl" runat="server" MaxLength="9" aria-labeledby="lbl"></asp:TextBox></span>
                    </div>
                </div>
                <div class="roommatesRow rr2">
                    <div class="row col-sm-12 col-xs-12">
                        <div class="IdNoExists" role="alert" >
                            <asp:Label ID="Id2NoExists" runat="server" Visible="false"></asp:Label>
                        </div>
                   </div>
                        <span id="lblRoommate2Name" class="lbl">  <asp:Literal ID="ltrRoommatesName2" runat="server"></asp:Literal> </span>
                        <span><asp:TextBox ID="txtRoommate2Name" runat="server" aria-describedby="lblRoommate2Name" onpaste="return false"></asp:TextBox></span>
                   <div id="RoommatePhone2" runat="server" class="displayI" visible="false">
                        <span class="lbl lblM"><asp:Literal ID="ltrRoommatesPhone2" runat="server"></asp:Literal> </span>
                        <span class="phoneWrapper">
                        <span><asp:TextBox ID="txtRoommate2Phone" runat="server"  maxlength="7" class="roommatePhone " aria-labeledby="lblM"></asp:TextBox></span>
                        <span><asp:TextBox ID="txtRoommate2Area_code" runat="server" maxlength="3" class="roommateArea_code "></asp:TextBox></span>
                        </span>
                   </div>
                    <div id="RoommateId2" runat="server" class="displayI " visible="false">
                        <span class="lbl"><asp:Literal ID="ltrRoommatesId2" runat="server"></asp:Literal> </span>
                        <span><asp:TextBox ID="txtRoommate2Id" runat="server" MaxLength="9" aria-labeledby="lbl"></asp:TextBox></span>
                    </div>
                </div>
            </div>
        </div>
    </div>--%>
    <asp:LinkButton ID="btnContinue" class="btnContinue pieFix" runat="server" OnClick="btnContinue_Click">
        <%--<div class="btnContinue pieFix">--%>
            <div class="btnContinueInner">
                <asp:Literal runat="server" Text="<%$ Resources:LocalizedText , ContinuButton%>"/></div>
            <div id="btnContinueText" runat="server" class="btnContinueText">
            </div>
       <%-- </div>--%>
    </asp:LinkButton>
    <div class="clear">
    </div>
    <asp:HiddenField ID="hfSelectedCycle" runat="server" />
    <asp:HiddenField ID="customerPhone" runat="server" />
</asp:Content>
