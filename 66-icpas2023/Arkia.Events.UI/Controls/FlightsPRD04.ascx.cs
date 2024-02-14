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
    public partial class PRD04 : BaseUserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                ltrTitle.Text = TextsController.GetText(EventId, 33, base.Lang);
                btnContinueText.InnerText = TextsController.GetText(EventId, 22, base.Lang);
                Event eventSet = EventsController.GetEvent(EventId);
                EventCycle eventCycle = EventsController.GetEventCycle(CurrentContext.EventId, CurrentContext.CycleId, base.Lang);
                if (base.Lang == 2)
                {
                    lblOBFlightHeader.Text = string.Format("טיסת הלוך - {0}", eventCycle.StartDate.ToShortDateString());
                    lblIBFlightHeader.Text = string.Format("טיסת חזור - {0}", eventCycle.EndDate.ToShortDateString());
                }
                else
                {
                    lblOBFlightHeader.Text = string.Format("Outbound Flights - {0}", eventCycle.StartDate.ToShortDateString());
                    lblIBFlightHeader.Text = string.Format("Inbound Flights - {0}", eventCycle.EndDate.ToShortDateString());
                }
            }
            catch
            {
                Response.RedirectToRoute("home");
            }
        }
    }
}