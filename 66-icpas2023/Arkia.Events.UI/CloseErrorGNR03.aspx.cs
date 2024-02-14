using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Arkia.Events.BusinessControllers;

namespace Arkia.Events.LC2014.UI
{
    public partial class GNR03 : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ltrTextMarketing.Text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 5, base.Lang);
        }
    }
}