<%@ Page Language="C#" AutoEventWireup="true"
    CodeBehind="LandingPage.aspx.cs" Inherits="Arkia.Events.LC2014.UI.LandingPage" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
    <title></title>
<%--    <meta name="viewport" content="width=device-width, initial-scale=0.86, maximum-scale=5.0, minimum-scale=0.86" />--%>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="robots" id="robots" content="noindex" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link href='https://fonts.googleapis.com/css?family=Heebo' rel='stylesheet' />
</head>
<body runat="server" class="bodyLanding">
    <div id="header"></div>
    <div id="main">
        <div class="landingPageWrapper">
            <div id="subHeader">
                ברוכים הבאים לכנסי אילת – לשכת רו"ח 2023 
            </div>
            <div class="info">
                <div>ברוכים הבאים לכנסי אילת – לשכת רו"ח 2023</div>
            </div>

            <%--<div class="message">האתר ייפתח בקרוב להזמנות</div>--%>
            
            <form class="linksWrapper" runat="server">

                <asp:LinkButton runat="server" class="card" OnCommand="confButton_Click" CommandArgument="363">
                    <i class="icon"></i>
                    <div class="name"> כנס יוני </div>
                    <div class="text date">8.6 - 4.6</div>
                    <div class="text date">ימים א'- ה'</div>
                    <i class="arrow"></i>
                </asp:LinkButton>

                <asp:LinkButton runat="server" class="card" OnCommand="confButton_Click" CommandArgument="364">
                    <i class="icon"></i>
                    <div class="name">כנס יולי</div>
                    <div class="text date">6.7 - 2.7 </div>
                    <div class="text date">ימים א'- ה'</div>
                    <i class="arrow"></i>
                </asp:LinkButton>

            </form>
        </div>
    </div>
</body>
</html>

