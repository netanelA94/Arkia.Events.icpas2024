using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Arkia.Events.BusinessControllers;

namespace Arkia.Events.LC2014.UI.Admin
{
    public partial class HC : System.Web.UI.Page
    {

        protected void Page_Load(object sender, EventArgs e)
        {
            
            HttpContext c = HttpContext.Current;
            ltlPort.Text = c.Request.ServerVariables["SERVER_PORT"];
            ltlServer.Text = c.Request.ServerVariables["LOCAL_ADDR"];
            ltlClient.Text = c.Request.ServerVariables["REMOTE_ADDR"];

            try
            {
                object returnVal = GeneralController.HealthCheckSql();
                if (returnVal != null)
                {
                    ltlSql.Text = "CONNECTION OK";
                }
                else
                {
                    ltlSql.Text = "CONNECTION FAILED";
                }

            }
            catch
            {
                ltlSql.Text = "CONNECTION FAILED";
            }

            try
            {
                object returnVal = GeneralController.HealthCheckOracle();

                if (returnVal != null)
                {
                    ltlOracle.Text = "CONNECTION OK";
                }
                else
                {
                    ltlOracle.Text = "CONNECTION FAILED";
                }

            }
            catch
            {
                ltlOracle.Text = "CONNECTION FAILED";
            }
        }
    }
}