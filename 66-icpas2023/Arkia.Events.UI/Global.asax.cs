using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Routing;

namespace Arkia.Events.LC2014.UI
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            RegisterRoutes(RouteTable.Routes);
            
        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            RouteValueDictionary constraints = new RouteValueDictionary { { "lang", "en|he" } };

            routes.MapPageRoute("", "{lang}", "~/LandingPage.aspx", true, null, constraints);

            routes.MapPageRoute("home-lang", "home/{lang}", "~/LandingPage.aspx", true, null, constraints);

            routes.MapPageRoute("home", "home", "~/LandingPage.aspx", true);

            routes.MapPageRoute("", "", "~/LandingPage.aspx", true);

            routes.MapPageRoute("start-page", "start-page", "~/StartPageGNR02.aspx", true);

            routes.MapPageRoute("close-error", "close-error", "~/CloseErrorGNR03.aspx", true);

            routes.MapPageRoute("error", "error", "~/ErrorGNR01.aspx", true);

            routes.MapPageRoute("error-payment", "error-payment", "~/ErrorPaymentGNR04.aspx", true);

            routes.MapPageRoute("sign-in", "sign-in", "~/SignInRGS01.aspx", true);

            routes.MapPageRoute("event-cycles", "event-cycles", "~/EventCyclesRGS02.aspx", true);

            routes.MapPageRoute("popup", "popup", "~/PopUpPage.aspx", true);
            routes.MapPageRoute("wizard", "form-wizard/{identityNumber}/{firstName}/{lastName}/", "~/FormWizard.aspx", true);

            routes.MapPageRoute("wizard", "form-wizard", "~/FormWizard.aspx", true);

            routes.MapPageRoute("payment", "payment", "~/PaymentPMN02.aspx", true);

            routes.MapPageRoute("tnx", "tnx", "~/ThankYouPMN04.aspx", true);

            routes.MapPageRoute("clearcache", "clearcache", "~/ClearCache.aspx", true);

            routes.MapPageRoute("hc", "hc", "~/Admin/HC.aspx", true);

            routes.MapPageRoute("postmpi", "postmpi", "~/PCI.aspx", true);

        }
    }
}