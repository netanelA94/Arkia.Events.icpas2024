using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using Arkia.Events.UserDefinedTypes;
using System.Xml.Linq;
using Newtonsoft.Json.Linq;


namespace Arkia.Events.LC2014.UI
{
    public static class CurrentContext
    {

        public  static HttpSessionState Session 
        {
            get { return HttpContext.Current.Session; } 
        }

        private static void saveEventIDSessionInCookie(long eventId_session)
        {
            if (HttpContext.Current.Request.Cookies["eventID"] != null)
                HttpContext.Current.Response.Cookies.Remove("eventID");

            HttpCookie ck_eventID = new HttpCookie("eventID")
            {
                Secure = true,
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.Now.AddHours(1),
                Value = eventId_session.ToString()
            };
            HttpContext.Current.Response.Cookies.Add(ck_eventID);
        }

        private static int getEventIDSessionFromCookie()
        {
            HttpCookie ck_eventID = HttpContext.Current.Request.Cookies["eventID"];
            if (ck_eventID != null && !string.IsNullOrEmpty(ck_eventID.Value))
            {
                return int.Parse(ck_eventID.Value);
            }

            return 0;
        }



        public static int EventId
        {
            get
            {
                if (Session["EventId"] == null)
                    Session["EventId"] = getEventIDSessionFromCookie();

                return int.Parse(Session["EventId"].ToString());
            }
            set
            {
                saveEventIDSessionInCookie(value);
                Session["EventId"] = value;
            }
        }

        public static int CycleId
        {
            get
            {
                if (Session["CycleId"] == null)
                    return 0;
                return int.Parse(Session["CycleId"].ToString());
            }
            set
            {
                Session["CycleId"] = value;
            }
        }

        private static void saveOracleSessionInCookie(long ora_session)
        {
            if (HttpContext.Current.Request.Cookies["ora_session"] != null)
                HttpContext.Current.Response.Cookies.Remove("ora_session");

            HttpCookie ck_ora_session = new HttpCookie("ora_session")
            {
                Secure = true,
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.Now.AddHours(1),
                Value = ora_session.ToString()
            };
            HttpContext.Current.Response.Cookies.Add(ck_ora_session);
        }

        private static int getOracleSessionFromCookie()
        {
            HttpCookie ck_ora_session = HttpContext.Current.Request.Cookies["ora_session"];
            if (ck_ora_session != null && !string.IsNullOrEmpty(ck_ora_session.Value))
            {
                return int.Parse(ck_ora_session.Value);
            }

            return 0;
        }



        public static int OracleSession
        {
            get
            {
                if (Session["OracleSession"] == null)
                    Session["OracleSession"] = getOracleSessionFromCookie();

                return int.Parse(Session["OracleSession"].ToString());
            }
            set
            {
                saveOracleSessionInCookie(value);
                Session["OracleSession"] = value;
            }
        }

        public static string LoginParam1
        {
            get
            {
                if (Session["LoginParam1"] == null)
                    return string.Empty;
                return Session["LoginParam1"].ToString();
            }
            set
            {
                Session["LoginParam1"] = value;
            }
        }

        public static string LoginParam2
        {
            get
            {
                if (Session["LoginParam2"] == null)
                    return string.Empty;
                return Session["LoginParam2"].ToString();
            }
            set
            {
                Session["LoginParam2"] = value;
            }
        }

        public static int RoommateNO
        {
            get
            {
                if (Session["Roommate"] == null)
                    return 0;
                return int.Parse(Session["Roommate"].ToString());
            }
            set
            {
                Session["Roommate"] = value;
            }
        }

        public static M_SHARING_PAX SharingPax
        {
            get
            {
                if (Session["M_SHARING_PAX"] == null)
                    return null;
                return Session["M_SHARING_PAX"] as M_SHARING_PAX;
            }
            set
            {
                Session["M_SHARING_PAX"] = value;
            }
        }

        public static JObject ParamInfo
        {
            get
            {
                if (Session["ParamInfo"] == null)
                    return null;
                return Session["ParamInfo"] as JObject;
            }
            set
            {
                Session["ParamInfo"] = value;
            }
        }

        public static int RegTypeCode
        {
            get
            {
                if (Session["TypeCode"] == null)
                    return 0;
                return int.Parse(Session["TypeCode"].ToString());
            }
            set
            {
                Session["TypeCode"] = value;
            }
        }
    }
}