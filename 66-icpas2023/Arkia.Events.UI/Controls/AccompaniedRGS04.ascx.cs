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
    public partial class RGS04 : BaseUserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ltrTitle.Text = TextsController.GetText(EventId, 28, base.Lang);
            btnContinueText.InnerText = TextsController.GetText(EventId, 17, base.Lang);
            Event eventSet = EventsController.GetEvent(EventId);
            passportBox1.Visible = passportBox2.Visible = eventSet.Passport;
        }
    }
}