using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Arkia.Events.BusinessControllers;
using Arkia.Events.LC2014.Controllers;
using Arkia.Events.LC2014.Entities;
using Arkia.Events.BusinessEntities;
using Arkia.Events.Common.Extensions;
using Arkia.Events.Infrastructure.Core;
using System.Xml.Linq;

namespace Arkia.Events.LC2014.UI
{
    /// <summary>
    /// Login Page
    /// </summary>
    public partial class RGS01 : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //if (Request.QueryString["c"] == null)
            //{
            //    Response.RedirectToRoute("home");
            //}

            Event eventSet = EventsController.GetEvent(CurrentContext.EventId);
            if (eventSet == null || eventSet.Status != -1 || DateTime.Now >= eventSet.EndDate || DateTime.Now <= eventSet.OpenDate)
            {
                Response.Redirect("~/close-error");
            }
            if (ConfigSettings.GetBoolean("IsProd") && (!eventSet.Active))
            {
                Response.Redirect("~/close-error");
            }

            linkCatalog.Visible = eventSet.CatalogUrl.IsNotNullOrEmpty();
            hlCatalog.HRef = eventSet.CatalogUrl;

            ltrTitle.Text = TextsController.GetText(CurrentContext.EventId, 38, base.Lang);
            ltrTextMarketingTitle.Text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 6, base.Lang);
            ltrTextMarketing.Text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 7, base.Lang);
            btnContinueText.InnerText = TextsController.GetText(CurrentContext.EventId, 13, base.Lang);
            lblLoginError.Text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 8, base.Lang);

            base.SetPageMessage(45, 123, 330, 331, 426);
        }

        protected void btnContinue_Click(object sender, EventArgs e)
        {
            string birthDate = hfDob.Value;
            //LoginResult loginResult = LoginController.Login(EventId, 0, txtID.Text.ToString("D9"), txtLicense.Text, null, base.Lang);
            LoginResult loginResult = LoginController.Login(CurrentContext.EventId, 0, txtID.Text.ToString("D9"), birthDate, null, base.Lang);
            if (loginResult.ReturnCode == 0)
            {
                CurrentContext.LoginParam1 = txtID.Text.Trim();
                CurrentContext.LoginParam2 = birthDate;
                //CurrentContext.LoginParam2 = txtLicense.Text.Trim();
                CurrentContext.OracleSession = loginResult.OracleSession;
                CurrentContext.ParamInfo = loginResult.ParamInfo;
                Response.RedirectToRoute("event-cycles");
                CurrentContext.ParamInfo = loginResult.ParamInfo;
                int RegTypeCode = loginResult.ParamInfo != null && loginResult.ParamInfo["reg_type_code"].ToString() != string.Empty ? loginResult.ParamInfo["reg_type_code"].ToInt32() : 0;
                CurrentContext.RegTypeCode = RegTypeCode;

            }
            else
            {
                if (loginResult.ReturnCode == 334)
                {
                    Response.Redirect("error?er=334");
                    Response.End();
                }
                lblLoginError.Visible = true;
            }
        }
    }

}