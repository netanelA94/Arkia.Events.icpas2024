using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Arkia.Events.BusinessControllers;
using Arkia.Events.BusinessEntities;

namespace Arkia.Events.LC2014.UI
{
    public partial class PopUpPage : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            int contentPageId;
            if (Request.QueryString["id"] != null)
            {
                int.TryParse(Request.QueryString["id"].ToString(), out contentPageId);

                ContentPage contentPage = ContentPagesController.GetContentPage(CurrentContext.EventId, contentPageId, base.Lang);
                if (contentPage != null)
                {
                    ltrTitle.Text = contentPage.Title;
                    ltrContent.Text = contentPage.Content;
                }
            }
            if (base.Lang == 1)
            {
                form1.Attributes.Add("dir", "ltr");
            }
        }
    }
}