using Arkia.Events.BusinessControllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Arkia.Events.LC2014.UI.Controls
{
    public partial class ProductsPRD06 : BaseUserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ltrTitle.Text = TextsController.GetText(EventId, 82, base.Lang);
            btnContinueText.InnerText = TextsController.GetText(EventId, 83, base.Lang);
            infoBox.DataSourceId = 7;
        }
    }
}