using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using Arkia.Events.Infrastructure.Core;

namespace Arkia.Events.LC2014.UI
{
    public class BaseUserControl : UserControl
    {
        protected static int EventId { get; set; }

        static BaseUserControl()
        {
            //EventId = ConfigSettings.GetInt32("EventId");
            EventId = CurrentContext.EventId;
        }
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
    }
}