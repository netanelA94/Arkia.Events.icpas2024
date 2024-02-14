using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Arkia.Events.BusinessControllers;
using Arkia.Events.BusinessEntities;
using Arkia.Events.Common.Extensions;

namespace Arkia.Events.LC2014.UI.Controls
{
    public partial class PMN01 : BaseUserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ltrTitle.Text = TextsController.GetText(EventId, 35, base.Lang);
            btnContinueText.InnerText = TextsController.GetText(EventId, 24, base.Lang);
            ltrTextMarketing.Text = TextsController.GetText(EventId, 75, base.Lang);
            ltrSummaryNotice.Text = TextsController.GetText(EventId, 76, base.Lang);
            ltrRegulations.Text = TextsController.GetText(EventId, 110, base.Lang);
            ltrConfirmRegulations.Text = TextsController.GetText(EventId, 111, base.Lang);
            Event eventSet = EventsController.GetEvent(EventId);
            regulationsBox.Visible = eventSet.RegProcFileName.IsNotNullOrEmpty();
            hlRegulations.HRef = eventSet.RegProcFileName;
            EventCycle eventCycle = EventsController.GetEventCycle(CurrentContext.EventId, CurrentContext.CycleId, base.Lang);
            double nightsCount = eventCycle.EndDate.Subtract(eventCycle.StartDate).TotalDays;
            if(base.Lang == 2)
            {
                ltrHotelDate.Text = string.Format("{0} - {1}, {2} לילות",
                eventCycle.StartDate.ToShortDateString(),
                eventCycle.EndDate.ToShortDateString(),
                nightsCount);
            }
            else
            {
                ltrHotelDate.Text = string.Format("{0} - {1}, {2} nights",
                eventCycle.StartDate.ToShortDateString(),
                eventCycle.EndDate.ToShortDateString(),
                nightsCount);
            }
        }
    }
}