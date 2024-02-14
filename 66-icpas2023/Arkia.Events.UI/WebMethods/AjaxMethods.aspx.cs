using System;
using System.Linq;
using System.Web.Services;
using Arkia.Events.UserDefinedTypes;
using Arkia.Events.LC2014.Controllers;
using Arkia.Events.LC2014.Entities;
using Arkia.Events.Infrastructure.Core;
using System.Web;
using System.Xml.Linq;

namespace Arkia.Events.LC2014.UI.WebMethods
{
    public partial class AjaxMethods : System.Web.UI.Page
    {
        [WebMethod]
        public static object GetFees()
        {
            if (CurrentContext.OracleSession != 0)
            {
                FeesResult feesResult = ProductsController.GetFees(CurrentContext.OracleSession, CurrentContext.EventId, CurrentContext.CycleId, CurrentContext.LoginParam1, CurrentContext.LoginParam2);
// error null value 
                var mainFees = feesResult.RegistraionFees.Value.
                    Select(f => new { AP_NAME = f.FEE_NAME, HOTEL_REQUIRE_YN = f.HOTEL_REQUIRE_YN, AP_PRD_KEY = f.FEE_PRD_KEY, PRICE = f.PRICE, CURRENCY = Util.GetCurrencyChar(f.CURRENCY_CODE), PRICE_CURRENCY = Util.GetPriceFormatWithCurrency(f.PRICE, f.CURRENCY_CODE) });


                //if (feesResult.CompanionsRegistraionFees != null && !feesResult.CompanionsRegistraionFees.IsNull)
                //{
                //    var adultFees = feesResult.CompanionsRegistraionFees.Value.Where(f => f.AGE_GROUP == "A").
                //        Select(f => new { AP_NAME = f.FEE_NAME, HOTEL_REQUIRE_YN = f.HOTEL_REQUIRE_YN, AP_PRD_KEY = f.FEE_PRD_KEY, PRICE = f.PRICE, CURRENCY = Util.GetCurrencyChar(f.CURRENCY_CODE), PRICE_CURRENCY = Util.GetPriceFormatWithCurrency(f.PRICE, f.CURRENCY_CODE) });

                //    var childFees = feesResult.CompanionsRegistraionFees.Value.Where(f => f.AGE_GROUP == "C").
                //        Select(f => new { AP_NAME = f.FEE_NAME, HOTEL_REQUIRE_YN = f.HOTEL_REQUIRE_YN, AP_PRD_KEY = f.FEE_PRD_KEY, PRICE = f.PRICE, CURRENCY = Util.GetCurrencyChar(f.CURRENCY_CODE), PRICE_CURRENCY = Util.GetPriceFormatWithCurrency(f.PRICE, f.CURRENCY_CODE) });

                //    var infantFees = feesResult.CompanionsRegistraionFees.Value.Where(f => f.AGE_GROUP == "I").
                //        Select(f => new { AP_NAME = f.FEE_NAME, HOTEL_REQUIRE_YN = f.HOTEL_REQUIRE_YN, AP_PRD_KEY = f.FEE_PRD_KEY, PRICE = f.PRICE, CURRENCY = Util.GetCurrencyChar(f.CURRENCY_CODE), PRICE_CURRENCY = Util.GetPriceFormatWithCurrency(f.PRICE, f.CURRENCY_CODE) });


                //    return new { mainFees = mainFees, adultFees = adultFees, childFees = childFees, infantFees = infantFees };
                //}
                if (feesResult.CompanionsRegistraionFees != null && !feesResult.CompanionsRegistraionFees.IsNull)
                {
                    var companionsFees = feesResult.CompanionsRegistraionFees.Value.
                        Select(f => new { AP_NAME = f.FEE_NAME, HOTEL_REQUIRE_YN = f.HOTEL_REQUIRE_YN, AP_PRD_KEY = f.FEE_PRD_KEY, PRICE = f.PRICE, CURRENCY = Util.GetCurrencyChar(f.CURRENCY_CODE), PRICE_CURRENCY = Util.GetPriceFormatWithCurrency(f.PRICE, f.CURRENCY_CODE), AGE_FROM = f.AGE_FROM, AGE_TO = f.AGE_TO });


                    return new { mainFees = mainFees, companionsFees = companionsFees };
                }
                else
                {
                    return new { mainFees = mainFees };
                }


            }
            throw new Exception();
        }

        [WebMethod]
        public static object GetHotels(int adults, int children, int infants)
        {
            if (CurrentContext.OracleSession != 0)
            {
                HotelsResult result = ProductsController.GetHotels(CurrentContext.OracleSession, "PRD01", CurrentContext.EventId, CurrentContext.CycleId, adults, children, infants);
                if (result.ReturnCode == 0)
                {
                    return result.Hotels;
                }
            }
            throw new Exception();
        }

        [WebMethod]
        public static object GetFlights()
        {
            if (CurrentContext.OracleSession != 0)
            {
                FlightsResults result = ProductsController.GetFlights(CurrentContext.OracleSession, "PRD03", CurrentContext.EventId, CurrentContext.CycleId);
                if (result.ReturnCode == 0)
                {
                    return new { OBFlights = result.OBFlights, IBFlights = result.IBFlights };
                }
            }
            throw new Exception();
        }

        [WebMethod]
        public static object GetAdditionalProducts(string pageCode)
        {
            if (CurrentContext.OracleSession != 0)
            {
                AdditionalProductsResults result = ProductsController.GetAdditionalProducts(CurrentContext.OracleSession, pageCode, CurrentContext.EventId, CurrentContext.CycleId);
                if (result.Products.Value != null)
                    result.Products.Value = result.Products.Value.Select(c => { c.EXECUTION_START_DATE = c.EXECUTION_START_DATE.Date; return c; }).ToArray();
                if (result.ReturnCode == 0)
                {
                    return result;
                }
            }
            throw new Exception();
        }

        [WebMethod]


        public static object GetShuttles(string pageCode1, string pageCode2)
        {
            if (CurrentContext.OracleSession != 0)
            {
                AdditionalProductsResults result1 = ProductsController.GetAdditionalProducts(CurrentContext.OracleSession, pageCode1, CurrentContext.EventId, CurrentContext.CycleId);
                AdditionalProductsResults result2 = ProductsController.GetAdditionalProducts(CurrentContext.OracleSession, pageCode2, CurrentContext.EventId, CurrentContext.CycleId);
                if (result1.ReturnCode == 0 && result2.ReturnCode == 0)
                {
                    return new { Products1 = result1.Products, Products2 = result2.Products };
                }
            }
            throw new Exception();
        }



        [WebMethod]
        public static object UpdateAuthentucation(string idNo, string phone1, string phone2, string email, string customerName, int regTypeCode)
        {
            BaseOracleResult result = LoginController.UpdateAuthentucation(CurrentContext.EventId, CurrentContext.CycleId, CurrentContext.LoginParam1, idNo, phone1, phone2, email, customerName, regTypeCode);

            return result;
        }


        [WebMethod]
        public static object CreateReservation(O_RESERVATION reservationDetails, string region)
        {
            reservationDetails.FEES.Value = reservationDetails.FEES.Value.OrderBy(f => f.PRD_KEY).ToArray();

            string additionalInputs = string.Format("<ID_NO>{0}</ID_NO><LICENSE_NO>{1}</LICENSE_NO><REGION>{2}</REGION>", CurrentContext.LoginParam1, CurrentContext.LoginParam2, region);

            ReservationResult result = ReservationController.CreateReservation(CurrentContext.OracleSession, CurrentContext.EventId, CurrentContext.CycleId, additionalInputs, reservationDetails, CurrentContext.SharingPax);
            if (result.ReturnCode == 0 && result.ReservationSn != 0)
            {
                HttpContext.Current.Session["ReservationResult"] = result;
            }
            return result;
        }

        [WebMethod]
        public static object CancelReservation(int reservationSn)
        {
            BaseOracleResult result = ReservationController.CancelReservation(CurrentContext.OracleSession, reservationSn);
            HttpContext.Current.Session.Remove("ReservationResult");
            return result;
        }

        [WebMethod]
        public static PCIUrlResult GetPCIUrl(string customerName)
        {
            try
            {
                string host = HttpContext.Current.Request.Url.Host;
                string appFolder = ConfigSettings.GetString("APPFolfer");
                PCIUrlResult result = ReservationController.GetPCIUrl(CurrentContext.OracleSession, customerName, host, appFolder, CurrentContext.EventId);
                if (result.ReturnCode != 0)
                {
                    Factory.GetLogger(typeof(AjaxMethods)).Error("GetPCIUrl ReturnCode:" + result.ReturnCode);
                }
                return result;
            }
            catch (Exception ex)
            {
                Factory.GetLogger(typeof(AjaxMethods)).Error("GetPCIUrl " + ex.Message, ex);
                PCIUrlResult resultError = new PCIUrlResult()
                {
                    ReturnCode = 500
                };
                return resultError;

            }
        }

        [WebMethod]
        public static PaymentResult DoPayment(int reservationsn, bool paymentByCc, string token, string txnToken, string cardOwnerName, int ccPlanNo,
        int cvv, int paymentsNo, string invoiceCustomerName, string vatCaseRefNo, string invoiceEmailSend, string formOfPayment, string pmtTokensXml)
        {
            try
            {
                M_PAYMENT_TOKENS paymentTokens = null;
                if (!string.IsNullOrWhiteSpace(pmtTokensXml))
                {
                    XDocument doc = XDocument.Parse(pmtTokensXml);
                    if (doc.Elements("M_PAYMENT_TOKENS").Elements("O_PAYMENT_TOKEN").Count() > 0)
                    {
                        paymentTokens = new M_PAYMENT_TOKENS();
                        paymentTokens.Value = doc.Elements("M_PAYMENT_TOKENS").Elements("O_PAYMENT_TOKEN")
                        .Select(q => new O_PAYMENT_TOKEN
                        {
                            PAYMENT_AMOUNT = (decimal)q.Element("PAYMENT_AMOUNT"),
                            PAYMENT_AMOUNTIsNull = false,
                            TOKENSN = (int)q.Element("TOKENSN"),
                            TOKENSNIsNull = false,
                            PAYMENT_CURRENCY_CODE = (string)q.Element("CURRENCY_CODE")

                        }).ToArray();
                    }
                }

                PaymentResult result = ReservationController.DoPayment(CurrentContext.OracleSession, CurrentContext.EventId, CurrentContext.CycleId, reservationsn, paymentByCc, token, txnToken, cardOwnerName,
                     ccPlanNo, cvv, paymentsNo, invoiceCustomerName, vatCaseRefNo, formOfPayment, invoiceEmailSend, paymentTokens);
                HttpContext.Current.Session.Remove("ReservationResult");
                if (result.ContinueAction == "CONFIRM_NOT_COMPLETE")
                {
                    Factory.GetLogger(typeof(AjaxMethods)).ErrorFormat("DoPayment message:", CurrentContext.OracleSession, CurrentContext.EventId, CurrentContext.CycleId, reservationsn, paymentByCc, token, txnToken, cardOwnerName,
                    ccPlanNo, cvv, paymentsNo, invoiceCustomerName, vatCaseRefNo, formOfPayment, invoiceEmailSend, paymentTokens);
                }
                if (result.ReturnCode != 0)
                {
                    Factory.GetLogger(typeof(AjaxMethods)).Error("DoPayment ReturnCode:" + result.ReturnCode);
                }
                return result;
            }
            catch (Exception ex)
            {
                Factory.GetLogger(typeof(AjaxMethods)).Error("DoPayment " + ex.Message, ex);
                PaymentResult resultError = new PaymentResult()
                {
                    ReturnCode = 500
                };
                return resultError;

            }
        }


        [WebMethod]
        public static void SendEmailDocs(int reservationsn, string email)
        {
            try
            {
                ReservationController.SendEmailDocs(CurrentContext.OracleSession, reservationsn, email);
            }
            catch (Exception ex)
            {
                Factory.GetLogger(typeof(AjaxMethods)).Error("SendEmailDocs " + ex.Message, ex);
            }
        }

    }
}