using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Arkia.Events.BusinessControllers;
using Arkia.Events.Common.Extensions;

namespace Arkia.Events.LC2014.UI
{
    public partial class PMN04 : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ltrTitle.Text = TextsController.GetText(CurrentContext.EventId, 109, base.Lang);
            lblTitleFinal.Text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 104, base.Lang);

            if (Request.QueryString["r"] == null || Request.QueryString["ca"] == null)
            {
                Response.RedirectToRoute("error");
                return;
            }

            int reservationSn = Request.QueryString["r"].ToInt32();
            string continueAction = Request.QueryString["ca"].ToString();
            string text = string.Empty;
            switch (continueAction)
            {
                case "RES_FAIL":
                    text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 108, base.Lang);
                    break;
                case "RES_OK_PMN_FAIL":
                    text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 107, base.Lang);
                    break;
                case "RES_OK_PMN_WAIT":
                    text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 106, base.Lang);
                    break;
                case "RES_OK_PMN_OK":
                    text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 105, base.Lang);
                    break;
                case "CONFIRM_NOT_COMPLETE":
                    text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 436, base.Lang);
                    break;
            }
            ltrTextFinal.Text = string.Format(text, string.Format("<span class='orderNum'>{0}</span>", reservationSn));

            string jsonScript = string.Format("var reservationSn = {0};", reservationSn);

            Page.ClientScript.RegisterStartupScript(typeof(Page), "jsonScript", jsonScript, true);
        }   
    }
}