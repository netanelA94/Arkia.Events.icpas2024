using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Arkia.Events.LC2014.Entities;
using Arkia.Events.LC2014.Controllers;
using Arkia.Events.Infrastructure.Core;

namespace Arkia.Events.LC2014.UI
{
    public partial class PCI : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string errorcode = Request.QueryString["error"].ToString();
            string customerName = Request.QueryString["cname"].ToString();

            int oraSession = 0;
            int oraReturnCode = -1;
            string oraReturnMessage = string.Empty;

            if (errorcode == string.Empty)
            {
                string token = Request.QueryString["token"].ToString();
                string txnToken = Request.QueryString["txn"].ToString();

                oraSession = CurrentContext.OracleSession;

                BaseOracleResult result = ReservationController.SetCC(CurrentContext.OracleSession, token, txnToken, customerName, CurrentContext.EventId);
                oraReturnCode = result.ReturnCode;
                oraReturnMessage = result.ReturnMessage;

                if (oraReturnCode == 0)
                {
                    Page.ClientScript.RegisterClientScriptBlock(typeof(Page), "setToken", string.Format("window.parent.ARKIA.PAYMENT.setToken('{0}','{1}','{2}','{3}','{4}',{5});", result.ReturnCode, token, txnToken, "", oraReturnMessage, oraSession), true);
                    return;
                }

            }

            string host = Request.Url.Host;
            string appFolder = ConfigSettings.GetString("APPFolfer");
            PCIUrlResult resultPci = ReservationController.GetPCIUrl(CurrentContext.OracleSession, customerName, host, appFolder, CurrentContext.EventId);
            Page.ClientScript.RegisterClientScriptBlock(typeof(Page), "setToken", string.Format("window.parent.ARKIA.PAYMENT.setToken('{0}','{1}','{2}','{3}','{4}',{5});", oraReturnCode, "", "", resultPci.Url, oraReturnMessage, oraSession), true);


        }
    }
}