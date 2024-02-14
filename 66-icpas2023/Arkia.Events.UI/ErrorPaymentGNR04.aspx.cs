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
    public partial class GNR04 : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ltrTitle.Text = TextsController.GetText(CurrentContext.EventId, 86, base.Lang);
            ltrTextMarketingTitle.Text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 87, base.Lang);
            ltrTextMarketing.Text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 88, base.Lang);
            hlPayment.Text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 89, base.Lang);
            hlPayment.NavigateUrl = "https://" + Request.Url.Host + "/" + ConfigSettings.GetString("APPFolfer") + "/payment";
        }
    }
}