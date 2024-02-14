using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Arkia.Events.BusinessEntities;
using Arkia.Events.BusinessControllers;

namespace Arkia.Events.LC2014.UI.Controls
{
    public partial class PCICtrl : BaseUserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            pciInfoText.InnerHtml = TextsController.GetTextHtmlFormat(EventId, 90, base.Lang);
            ltrPaymentError.Text = TextsController.GetText(EventId, 91, base.Lang);
        }
    }
}