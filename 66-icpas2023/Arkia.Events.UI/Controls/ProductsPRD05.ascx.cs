using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Arkia.Events.BusinessControllers;

namespace Arkia.Events.LC2014.UI.Controls
{
    public partial class PRD05 : BaseUserControl
    {

        public int TitleTextCode { get; set; }
        public int ButtonTextCode { get; set; }
        public int InfoBoxCode { get; set; }

        protected void Page_Load(object sender, EventArgs e)
        {
            ltrTitle.Text = TextsController.GetText(EventId, TitleTextCode != 0 ? TitleTextCode : 34, base.Lang);
            btnContinueText.InnerText = TextsController.GetText(EventId, ButtonTextCode != 0 ? ButtonTextCode : 23, base.Lang);
            infoBox.DataSourceId = InfoBoxCode != 0 ? InfoBoxCode : 6;
        }

        
    }
}