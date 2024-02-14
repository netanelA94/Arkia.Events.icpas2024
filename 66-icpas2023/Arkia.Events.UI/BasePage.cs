using Arkia.Events.BusinessControllers;
using Arkia.Events.Infrastructure.Core;
using System.Globalization;
using System.Text;
using System.Configuration;
using System.Threading;
using System.Web;
using System.Web.UI;

namespace Arkia.Events.LC2014.UI
{
    public class BasePage : Page
    {
        //protected static int EventId { get; set; }

        //static BasePage()
        //{
        //    EventId = ConfigSettings.GetInt32("EventId");
        //}
        public int Lang
        {
            get
            {
                HttpCookie site_lang = Request.Cookies["lang"];
                if (site_lang != null)
                {
                    if (site_lang.Value == "en-US")
                    {
                        return 1;
                    }
                }
                return 2;
            }
        }
        protected override void OnPreInit(System.EventArgs e)
        {
            base.OnPreInit(e);
            Page.Theme = "Default";
            HttpCookie site_lang = Request.Cookies["lang"];
            if (site_lang != null)
            {
                Thread.CurrentThread.CurrentUICulture = new CultureInfo(site_lang.Value);
                Thread.CurrentThread.CurrentCulture = new CultureInfo(site_lang.Value);
                base.InitializeCulture();
            }
            //int httpsPort = 443;
            //int.TryParse(ConfigurationManager.AppSettings["HttpsPort"].ToString(), out httpsPort);
            //if (Request.Url.Port != httpsPort)
            //{
            //    string redirectUrl = Request.Url.ToString().Replace("http:", "https:");
            //    Response.Redirect(redirectUrl);
            //}
        }


        protected void SetPageMessage(params int[] messagesId)
        {
            StringBuilder script = new StringBuilder();

            for (int i = 0; i < messagesId.Length; i++)
            {
                script.AppendFormat("var MSG{0}=\"{1}\";", messagesId[i], TextsController.GetTextJavaScriptStringEncode(CurrentContext.EventId, messagesId[i], Lang));
            }
            Page.ClientScript.RegisterStartupScript(typeof(Page), "PageMessages", script.ToString(), true);
        }
    }
}