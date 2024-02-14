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
    public partial class InfoBoxCtrl : BaseUserControl
    {
        public int DataSourceId { get; set; }

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected override void OnPreRender(EventArgs e)
        {
            base.OnPreRender(e);

            InfoBox infoBox  =  TextsController.GetInfoBox(EventId, DataSourceId, base.Lang);
            if (infoBox != null && infoBox.Content != null && infoBox.Content.Count > 0)
            {
                lvInfoBox.DataSource = infoBox.Content;
                lvInfoBox.DataBind();
            }
            else
            {
                infoBoxDiv.Visible = false;
            }
        }
    }
}