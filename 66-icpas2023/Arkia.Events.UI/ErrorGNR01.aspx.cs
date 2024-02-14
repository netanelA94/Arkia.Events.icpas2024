using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Arkia.Events.BusinessControllers;
using Arkia.Events.Infrastructure.Core;

namespace Arkia.Events.LC2014.UI
{
    public partial class GNR01 : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ltrTitle.Text = TextsController.GetText(CurrentContext.EventId, 56, base.Lang);
            ltrTextMarketingTitle.Text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 58, base.Lang);
            if (Request.QueryString["er"] != null)
            {
                if (int.Parse(Request.QueryString["er"].ToString()) == 334)
                {
                    ltrTextMarketing.Text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 113, base.Lang);
                }
                else if (int.Parse(Request.QueryString["er"].ToString()) == 5303)
                {
                    ltrTextMarketing.Text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 377, base.Lang);
                }
                else
                {
                    ltrTextMarketing.Text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 57, base.Lang);
                }
            } 
            else
            {
                ltrTextMarketing.Text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 57, base.Lang);
            }

            hlPayment.Text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 124, base.Lang);
            hlPayment.NavigateUrl = ResolveUrl("~/home");
            //hlPayment.NavigateUrl = "http://" + Request.Url.Host + "/" + ConfigSettings.GetString("APPFolfer");
        }
    }
}