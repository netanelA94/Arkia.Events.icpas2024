using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Arkia.Events.BusinessControllers;

namespace Arkia.Events.LC2014.UI.Controls
{
    public partial class RGS05 : BaseUserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ltrTitle.Text = TextsController.GetText(EventId, 29, base.Lang);
            btnContinueText.InnerText = TextsController.GetText(EventId, 18, base.Lang);
        }
    }
}