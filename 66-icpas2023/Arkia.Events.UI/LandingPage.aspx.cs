using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Arkia.Events.LC2014.UI
{
    public partial class LandingPage : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void confButton_Click(object sender, CommandEventArgs e)
        {
            CurrentContext.EventId = Int32.Parse(e.CommandArgument.ToString());

            Response.Redirect("~/start-page");
        }
    }
}