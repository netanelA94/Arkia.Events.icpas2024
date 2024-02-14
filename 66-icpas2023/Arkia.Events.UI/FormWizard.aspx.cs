using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Arkia.Events.BusinessControllers;
using System.Web.Script.Serialization;
using Arkia.Events.BusinessEntities;
using Arkia.Events.Infrastructure.Core;

namespace Arkia.Events.LC2014.UI
{
    public partial class FormWizard : BasePage
    {
        private static string jsonScript;
        private string script;

        //static FormWizard()
        //{

        //}

        protected void Page_Load(object sender, EventArgs e)
        {

            List<Title> titles = UtilityController.GetTitles(base.Lang);
           List<Title> jobTitles = UtilityController.GetJobTitles(base.Lang);

            JavaScriptSerializer oSerializer = new JavaScriptSerializer();
            string titlesJsonFormat = oSerializer.Serialize(titles);
           string jobTitlesJsonFormat = oSerializer.Serialize(jobTitles);

            Event eventSet = EventsController.GetEvent(CurrentContext.EventId);

            jsonScript = string.Format("var titlesData = {0}; var jobTitlesData = {1}; var MaxCompanions = {2}; var ChildAgeStart = {3};  var ChildAgeEnd = {4}; var APPFolfer = '{5}'; var eventsCurrency = '{6}'; var hasPassport = {7};"
                , titlesJsonFormat, jobTitlesJsonFormat, ConfigSettings.GetInt32("MaxCompanions"), eventSet.ChildAgeStart, eventSet.ChildAgeEnd, ConfigSettings.GetString("APPFolfer"), Util.GetCurrencyChar(eventSet.CurrencyCode), eventSet.Passport ? "true" : "false");
            base.SetPageMessage(40, 41, 42, 43, 44, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 93, 103, 112, 129, 130, 131, 132, 133, 134, 135, 321, 322, 323, 324, 335, 338, 343, 341, 342, 344, 336, 337, 338, 316, 317, 318, 319, 137, 200, 383, 390, 391, 392, 393, 394, 395, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 439, 440, 441, 442, 443, 444, 371, 370, 480, 481);

            ltrStep1.Text = TextsController.GetText(CurrentContext.EventId, 114, base.Lang);
            if (wizard.FindControl("ltrStep2") != null)
                ((Literal)wizard.FindControl("ltrStep2")).Text = TextsController.GetText(CurrentContext.EventId, 115, base.Lang);
            if (wizard.FindControl("ltrStep3") != null)
                ((Literal)wizard.FindControl("ltrStep3")).Text = TextsController.GetText(CurrentContext.EventId, 116, base.Lang);
            if (wizard.FindControl("ltrStep4") != null)
                ((Literal)wizard.FindControl("ltrStep4")).Text = TextsController.GetText(CurrentContext.EventId, 117, base.Lang);
            if (wizard.FindControl("ltrStep5") != null)
                ((Literal)wizard.FindControl("ltrStep5")).Text = TextsController.GetText(CurrentContext.EventId, 118, base.Lang);
            if (wizard.FindControl("ltrStep6") != null)
                ((Literal)wizard.FindControl("ltrStep6")).Text = TextsController.GetText(CurrentContext.EventId, 119, base.Lang);
            if (wizard.FindControl("ltrStep7") != null)
                ((Literal)wizard.FindControl("ltrStep7")).Text = TextsController.GetText(CurrentContext.EventId, 120, base.Lang);
            if (wizard.FindControl("ltrStep8") != null)
                ((Literal)wizard.FindControl("ltrStep8")).Text = TextsController.GetText(CurrentContext.EventId, 121, base.Lang);
            if (wizard.FindControl("ltrStep13") != null)
                ((Literal)wizard.FindControl("ltrStep13")).Text = TextsController.GetText(CurrentContext.EventId, 127, base.Lang); //meals
            if (wizard.FindControl("ltrStep9") != null)
                ((Literal)wizard.FindControl("ltrStep9")).Text = TextsController.GetText(CurrentContext.EventId, 122, base.Lang);
            if (wizard.FindControl("ltrStep10") != null)
                ((Literal)wizard.FindControl("ltrStep10")).Text = TextsController.GetText(CurrentContext.EventId, 334, base.Lang);



            EventCycle eventCycle = EventsController.GetEventCycle(CurrentContext.EventId, CurrentContext.CycleId, base.Lang);

            script = string.Format("{0} var startDate = '{1}'; var endDate = '{2}'; var hasRoommate = {3}; var maxRooms = {4}; var regTypeCode = {5};", jsonScript,
                eventCycle.StartDate.ToShortDateString(), eventCycle.EndDate.ToShortDateString(), CurrentContext.RoommateNO > 0 ? "true" : "false",
                CurrentContext.RoommateNO > 0 ? 1 : eventSet.MaxRoomsPerReservation, CurrentContext.RegTypeCode);
        }

        protected override void OnInit(EventArgs e)
        {
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetNoStore();
            Response.Cache.SetExpires(DateTime.MinValue);

            base.OnInit(e);
        }

        protected override void OnPreInit(EventArgs e)
        {
            base.OnPreInit(e);
            if (CurrentContext.OracleSession == 0 || CurrentContext.CycleId == 0)
            {
                Response.RedirectToRoute("home");
                Response.End();
                return;
            }
            if (Session["ReservationResult"] != null)
            {
                Response.RedirectToRoute("error-payment");
                Response.End();
                return;
            }
        }

        protected override void OnPreRender(EventArgs e)
        {
            Page.ClientScript.RegisterStartupScript(typeof(Page), "jsonScript", script, true);
            base.OnPreRender(e);
        }
    }
}