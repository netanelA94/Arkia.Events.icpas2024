using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Arkia.Events.Infrastructure.Core;
using Arkia.Events.BusinessEntities;
using Arkia.Events.BusinessControllers;

namespace Arkia.Events.LC2014.UI
{
    public class Util
    {
        //public static T GetItemFromCache<T>(string itemCacheKey, Func<T> func, string cacheName)
        //{
        //    return Factory.CacheManager.Get<T>(itemCacheKey,
        //        ConfigSettings.GetInt32(cacheName),
        //        CacheExpiration.Absolute,
        //        func);
        //}

        //public static string GetText(int eventId, int textId)
        //{
        //   List<Text> texts =  Util.GetItemFromCache<List<Text>>(string.Format("CMS_Texts_{0}", eventId),
        //                                               delegate() { return TextsController.GetTexts(eventId); },
        //                                               "CMS");

        //    if (texts == null)
        //        return null;

        //    Text text = texts.SingleOrDefault(t => t.Id == textId);
        //    return text != null ? text.Content : null;
        //}

        public static string GetPriceFormatWithCurrency(decimal price, string currencyCode)
        {
            if (price < 0)
            {
                return string.Format("{1} -{0}", Util.GetCurrencyChar(currencyCode.ToString()),
                   decimal.Round(Math.Abs(price)).ToString("###,###,###,###,###"));
            }
            else if (price == 0)
            {
                return string.Format("{0}{1}", Util.GetCurrencyChar(currencyCode.ToString()), price);
            }
            return string.Format("{0}{1}", Util.GetCurrencyChar(currencyCode.ToString()),
                   decimal.Round(price).ToString("###,###,###,###,###"));
        }

        public static string GetPriceFormat(decimal price)
        {
            if (price < 0)
            {
                return decimal.Round(price).ToString("###,###,###,###,###");
            }
            return decimal.Round(Math.Abs(price)).ToString("###,###,###,###,###");
        }

        public static string GetCurrencyChar(string CurrencyCode)
        {
            string currencyChar = CurrencyCode;
            switch (CurrencyCode)
            {
                case "USD":
                    currencyChar = "$";
                    break;
                case "ILS":
                    currencyChar = "₪";
                    break;
                case "EUR":
                    currencyChar = "€";
                    break;
                case "GBP":
                    currencyChar = "£";
                    break;
                case "JPY":
                    currencyChar = "¥";
                    break;
                default:
                    break;
            }

            return currencyChar;
        }

    }
}