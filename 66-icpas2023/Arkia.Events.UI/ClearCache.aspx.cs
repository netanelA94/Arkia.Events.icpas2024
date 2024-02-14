using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Arkia.Events.Infrastructure.Core;
using Oracle.DataAccess.Client;

namespace Arkia.Events.LC2014.UI
{
    public partial class ClearCache : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            contentDiv.Visible = IsAdministrator;
            loginDiv.Visible = !IsAdministrator;
        }

        protected bool IsAdministrator
        {
            get
            {
                if (Session["IsAdministrator"] == null)
                    return false;
                return bool.Parse(Session["IsAdministrator"].ToString());
            }
            set
            {
                Session["IsAdministrator"] = value;
            }
        }

        protected void btnClearCache_Click(object sender, EventArgs e)
        {
            Factory.CacheManager.Flush();
            ShowCache();
        }


        protected void btnShowCache_Click(object sender, EventArgs e)
        {
            ShowCache();
        }

        private void ShowCache()
        {
            treeCache.Visible = true;

            List<KeyValuePair<string, string>> cacheItems = Factory.CacheManager.GetList();

            lvCache.DataSource = cacheItems;
            lvCache.DataBind();

            lblSumCache.Text = string.Format("There are {0} items in the cache", cacheItems.Count);
        }

        protected void lvCache_ItemDataBound(object sender, ListViewItemEventArgs e)
        {
            KeyValuePair<string, string> item = ((KeyValuePair<string, string>)(e.Item.DataItem));

            ((Literal)e.Item.FindControl("ltrChaceKey")).Text = item.Key;
            int indexof = item.Value.IndexOf("[");
            ((Literal)e.Item.FindControl("ltrChacevalue")).Text = item.Value.Substring(indexof < 0 ? 0 : indexof);
        }

        protected void btnLogin_Click(object sender, EventArgs e)
        {
            if (txtUserName.Text == "aikra" && txtPassword.Text == "admin!")
            {
                IsAdministrator = true;
                contentDiv.Visible = true;
                loginDiv.Visible = false;
            }
        }



        protected void btnClearAllPools_Click(object sender, EventArgs e)
        {
            try
            {
                OracleConnection.ClearAllPools();
                if (Response.IsClientConnected)
                    Response.Write("All Pools Cleared");
            }
            catch (Exception ex)
            {
                Factory.GetLogger(typeof(ClearCache)).Error(ex.Message, ex);
                if (Response.IsClientConnected)
                    Response.Write("Error - Clear All Pools");
            }
        }
    }
}