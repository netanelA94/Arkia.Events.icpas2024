using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Arkia.Events.BusinessControllers;
using Arkia.Events.Infrastructure.Core;
using Arkia.Events.BusinessEntities;

namespace Arkia.Events.LC2014.UI
{
    public partial class Site : System.Web.UI.MasterPage
    {
        protected static int EventId { get; set; }

        static Site()
        {
            EventId =  ConfigSettings.GetInt32("EventId");
            CurrentContext.EventId = EventId;
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            int lang = 2;
            //HttpCookie site_lang = Request.Cookies["lang"];
            //if (site_lang != null)
            //{
            //    if (site_lang.Value == "en-US")
            //    {
            //        bodyMain.Attributes.Add("class", "bodyMain ltr");
            //        html.Attributes.Add("lang", "en");
            //        goToEnglish.Visible = false;
            //        goToHebrew.Visible = true;
            //        lang = 1;
            //        hlheader.Attributes.Add("aria-label", "to home page");
            //    }
            //    else
            //    {
            //        bodyMain.Attributes.Add("class", "bodyMain");
            //        html.Attributes.Add("lang", "he");
            //        goToEnglish.Visible = true;
            //        goToHebrew.Visible = false;
            //        hlheader.Attributes.Add("aria-label", "כנס הקיץ הראשון של לשכת עורכי הדין באילת, לדף הבית");
            //    }
            //}
            Links links = LinksController.GetLinks(CurrentContext.EventId, 1, lang);

            if (links != null && links.Content != null)
            {
                lvFooterLinks.DataSource = links.Content;
                lvFooterLinks.DataBind();
            }
            lblFooterServiceText.Text = TextsController.GetText(CurrentContext.EventId, 1, lang);
            lblFooterCopyrights.Text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 2, lang);

            hlheader.HRef = "~/";


            
        }
        HttpCookie current_lang = new HttpCookie("lang");
        protected void enClick(object sender, EventArgs e)
        {
            current_lang.Value = "en-US";
            Response.Cookies.Add(current_lang);
            Response.Redirect("~/home/en");
        }
        protected void heClick(object sender, EventArgs e)
        {
            current_lang.Value = "he-IL";
            Response.Cookies.Add(current_lang);
            Response.Redirect("~/home/he");
        }


        protected void lvFooterLinks_ItemDataBound(object sender, ListViewItemEventArgs e)
        {
            Link link = e.Item.DataItem as Link;

            HyperLink hyperLink = e.Item.FindControl("hyperLink") as HyperLink;
            hyperLink.Text = link.Text;
            if (link.Type == LinkType.ExternalLink)
            {
                hyperLink.NavigateUrl = link.Href;
            }
            else
            {
                hyperLink.NavigateUrl = "#";
                hyperLink.Attributes["onclick"] = string.Format("window.open('{0}','_blank','{1}'); return false;", ResolveUrl("~/popuppage.aspx?id=") + link.ContentPageId, "scrollbars=yes, status=1, height=610, width=630");
            }

        }
    }
}
