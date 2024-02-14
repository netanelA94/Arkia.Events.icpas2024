using Arkia.Events.BusinessControllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Arkia.Events.LC2014.UI.Controls
{
    public partial class ProductsPRD07 : BaseUserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ltrTitle.Text = TextsController.GetText(EventId, 84, base.Lang);
            btnContinueText.InnerText = TextsController.GetText(EventId, 85, base.Lang);
            infoBox.DataSourceId = 8;
        }
    }
}