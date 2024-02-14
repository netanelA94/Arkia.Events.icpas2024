using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Arkia.Events.BusinessControllers;
using Arkia.Events.BusinessEntities;
using Arkia.Events.Infrastructure.Core;
using System.Xml.Linq;
using Arkia.Events.UserDefinedTypes;

namespace Arkia.Events.LC2014.UI
{
    public partial class GNR02 : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Session.Clear();
            HttpCookie current_lang = new HttpCookie("lang");
            if (Page.RouteData.Values["lang"] != null)
            {
                var lang = Page.RouteData.Values["lang"].ToString();
                if (lang == "en")
                {
                    current_lang.Value = "en-US";
                }
                else
                {
                    current_lang.Value = "he-IL";
                }
            }
            else
            {
                current_lang.Value = "he-IL";
            }
            Response.Cookies.Add(current_lang);

            Event eventSet = EventsController.GetEvent(CurrentContext.EventId);

            if (eventSet == null || eventSet.Status != -1 || DateTime.Now >= eventSet.EndDate || DateTime.Now <= eventSet.OpenDate)
            {
                Response.Redirect("~/close-error");
            }
            if (ConfigSettings.GetBoolean("IsProd") && (!eventSet.Active))
            {
                Response.Redirect("~/close-error");
            }

            lblHomepageGreeting.Text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 3, base.Lang);
            ltrTextMarketing.Text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 4, base.Lang);
            btnContinueText.InnerText = TextsController.GetText(CurrentContext.EventId, 12, base.Lang);

            hlContinue.NavigateUrl = ResolveUrl("~/sign-in");
        }
    }
}