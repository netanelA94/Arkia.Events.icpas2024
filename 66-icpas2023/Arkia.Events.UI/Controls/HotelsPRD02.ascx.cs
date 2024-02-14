using Arkia.Events.BusinessControllers;
using Arkia.Events.BusinessEntities;
using System;

namespace Arkia.Events.LC2014.UI.Controls
{
    public partial class PRD02 : BaseUserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                ltrTitle.Text = TextsController.GetText(EventId, 31, base.Lang);
                btnContinueText.InnerText = TextsController.GetText(EventId, 20, base.Lang);
                string textMarketing = TextsController.GetTextHtmlFormat(EventId, 80, base.Lang);
                if (!string.IsNullOrEmpty(textMarketing))
                {
                    ltrTextMarketingTitle.Text = TextsController.GetTextHtmlFormat(EventId, 79, base.Lang);
                    ltrTextMarketing.Text = textMarketing;
                }
                else
                {
                    marketingTextBox.Visible = false;
                }
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