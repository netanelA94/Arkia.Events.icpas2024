using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Arkia.Events.BusinessControllers;

using System.Web.Script.Serialization;
using Arkia.Events.Infrastructure.Core;
using Arkia.Events.LC2014.Controllers;
using Arkia.Events.UserDefinedTypes;
using System.Web.UI.HtmlControls;
using Arkia.Events.BusinessEntities;
using Arkia.Events.LC2014.Entities;

namespace Arkia.Events.LC2014.UI
{
    public partial class PMN02 : BasePage
    {
        Event eventSet;
        decimal amountToPay = 0;
        protected void Page_Load(object sender, EventArgs e)
        {
            ReservationResult result = HttpContext.Current.Session["ReservationResult"] as ReservationResult;
            if (result == null)
            {
                Response.RedirectToRoute("error");                
                return;
            }
            //if (result.AmountToPay == 0)
            //{
            //    Response.Redirect("tnx?r=" + result.ReservationSn);
            //    return;
            //}


            if (base.Lang == 2)
            {
                ltrTitleCC.Text = TextsController.GetText(CurrentContext.EventId, 36, base.Lang) + " - הצעה מספר: " + result.ReservationSn;
                ltrTitle.Text = TextsController.GetText(CurrentContext.EventId, 37, base.Lang) + " - הצעה מספר: " + result.ReservationSn;
            }
            else
            {
                ltrTitleCC.Text = TextsController.GetText(CurrentContext.EventId, 36, base.Lang) + " - offer number: " + result.ReservationSn;
                ltrTitle.Text = TextsController.GetText(CurrentContext.EventId, 37, base.Lang) + " - offer number: " + result.ReservationSn;
            }
            ltrTextMarketingTitle.Text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 100, base.Lang);
            ltrTextMarketing.Text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 101, base.Lang);
            ltrPaymentNote.Text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 102, base.Lang);
            btnContinueCCText.InnerText = TextsController.GetText(CurrentContext.EventId, 25, base.Lang);
            btnContinueText.InnerText = TextsController.GetText(CurrentContext.EventId, 26, base.Lang);

            base.SetPageMessage(81, 92, 94, 95, 96, 97, 98,99, 350, 351, 352, 426);

            eventSet = EventsController.GetEvent(CurrentContext.EventId);
            amountToPay = result.AmountToPay;
            ltrTotalPrice.Text = ltrBalancePrice.Text = Util.GetPriceFormatWithCurrency(result.AmountToPay, result.CurrencyCode.Trim());
            balancePriceBox.Attributes.Add("data-amount", result.AmountToPay.ToString());
            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            string pricePlansJsonFormat = oSerializer.Serialize(result.PricePlans);

            string jsonScript = string.Format("var pricePlans = {0}; var reservationSn = {1}; var APPFolfer = '{2}';  var eventsCurrency = '{3}';", pricePlansJsonFormat, result.ReservationSn, ConfigSettings.GetString("APPFolfer"), Util.GetCurrencyChar(eventSet.CurrencyCode));

            Page.ClientScript.RegisterStartupScript(typeof(Page), "jsonScript", jsonScript, true);

            //toDelete for dev
            if (HttpContext.Current.Request.Url.ToString().Contains("dev"))
                ReservationController.CancelReservation(CurrentContext.OracleSession, result.ReservationSn);

            PaymentTokensResult retValTokens = ReservationController.GetEventsValidPmtTokens(CurrentContext.OracleSession, CurrentContext.EventId, eventSet.CurrencyCode, CurrentContext.LoginParam1);
          

            if (retValTokens != null && retValTokens.Tokens != null && retValTokens.Tokens.Value != null && retValTokens.Tokens.Value.Length > 0) 
            {
                tokensBox.Visible = balancePaymentCC.Visible = true;
                lvPayment.DataSource = retValTokens.Tokens.Value;
                lvPayment.DataBind();
            } 
        }

        protected void lvPayment_ItemDataBound(object sender, ListViewItemEventArgs e)
        {
            O_EVENT_PMT_TOKEN pmtToken = e.Item.DataItem as O_EVENT_PMT_TOKEN;
            

            Literal ltrTokenText = e.Item.FindControl("ltrTokenText") as Literal;
            ltrTokenText.Text = string.Format("מעוניין לשלם ע\"ח {0} סך ", pmtToken.SERIES_NAME);
            Literal ltrTokenCurrency = e.Item.FindControl("ltrTokenCurrency") as Literal;
            ltrTokenCurrency.Text = Util.GetCurrencyChar(eventSet.CurrencyCode);
            Literal ltrPmtToken = e.Item.FindControl("ltrPmtToken") as Literal;
            decimal maxToken = Math.Min(pmtToken.TOKEN_DUE_IN_CHARGE_CURRENCY, amountToPay);
            ltrPmtToken.Text = string.Format("(מקסימום לתשלום ע\"ח {0} {1})", pmtToken.SERIES_NAME, Util.GetPriceFormatWithCurrency(maxToken, eventSet.CurrencyCode));
            HtmlGenericControl liPmtToken = e.Item.FindControl("liPmtToken") as HtmlGenericControl;
            liPmtToken.Attributes.Add("data-max-token-due", maxToken.ToString());

            TextBox txtTokenVal = e.Item.FindControl("txtTokenVal") as TextBox;
            txtTokenVal.MaxLength = maxToken.ToString().Length;
            txtTokenVal.Attributes.Add("data-TOKENSN", pmtToken.TOKENSN.ToString());
            txtTokenVal.Attributes.Add("data-CURRENCY_CODE", pmtToken.TOKEN_CURRENCY_CODE);
            txtTokenVal.Attributes.Add("data-EXCHANGE_RATE", pmtToken.EXCHANGE_RATE.ToString());
            txtTokenVal.Attributes.Add("data-TOKEN_DUE", maxToken.ToString());


        }
    }
}