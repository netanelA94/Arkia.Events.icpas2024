using Arkia.Events.BusinessControllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Arkia.Events.LC2014.UI.Controls
{
    public partial class ShuttlePRD09 : BaseUserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ltrTitle.Text = TextsController.GetText(EventId, 339, base.Lang);
            btnContinueText.InnerText = TextsController.GetText(EventId, 340, base.Lang);
            infoBox.DataSourceId = 15;

            ltrNoLunch.Text = TextsController.GetText(EventId, 320, base.Lang);
        }
    }
}