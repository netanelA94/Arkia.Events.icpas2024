using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Arkia.Events.BusinessControllers;
using Arkia.Events.BusinessEntities;

namespace Arkia.Events.LC2014.UI.Controls
{
    public partial class PRD01 : BaseUserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                ltrTitle.Text = TextsController.GetText(EventId, 30, base.Lang);
                btnContinueText.InnerText = TextsController.GetText(EventId, 19, base.Lang);
                lblHotelComments1.InnerText = lblHotelComments1.InnerText = lblHotelComments2.InnerText = TextsController.GetText(EventId, 125, base.Lang);
                //string textMarketing = TextsController.GetTextHtmlFormat(EventId, 78, base.Lang);
                //if (!string.IsNullOrEmpty(textMarketing))
                //{
                //    ltrTextMarketingTitle.Text = TextsController.GetTextHtmlFormat(EventId, 77, base.Lang);
                //    ltrTextMarketing.Text = textMarketing;
                //}
                //else
                //{
                //    marketingTextBox.Visible = false;
                //}
                EventCycle eventCycle = EventsController.GetEventCycle(CurrentContext.EventId, CurrentContext.CycleId, base.Lang);
                double nightsCount = eventCycle.EndDate.Subtract(eventCycle.StartDate).TotalDays;
                if (base.Lang == 2)
                {
                    ltrEventProp.Text = string.Format("{0} לילות: מ {1} עד {2}",
                                        nightsCount, eventCycle.StartDate.ToShortDateString(), eventCycle.EndDate.ToShortDateString());
                }
                else
                {
                    ltrEventProp.Text = string.Format("{0} nights: from {1} to {2}",
                                        nightsCount, eventCycle.StartDate.ToShortDateString(), eventCycle.EndDate.ToShortDateString());
                }

            }
            catch
            {
                Response.RedirectToRoute("home");
            }
        }
    }
}