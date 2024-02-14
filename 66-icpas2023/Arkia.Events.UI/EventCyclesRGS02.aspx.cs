using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Arkia.Events.BusinessControllers;
using Arkia.Events.BusinessEntities;
using Arkia.Events.Common.Extensions;
using Arkia.Events.Infrastructure.Core;
using System.Xml.Linq;
using Arkia.Events.UserDefinedTypes;
using Arkia.Events.LC2014.Controllers;

namespace Arkia.Events.LC2014.UI
{
    public partial class RGS02 : BasePage
    {
        bool byPhone = false; //if byPhone ? true else if byId = false
        bool hasCycle = false;
        protected void Page_Load(object sender, EventArgs e)
        {
            Event eventSet = EventsController.GetEvent(CurrentContext.EventId);
            if (eventSet == null || eventSet.Status != -1 || DateTime.Now >= eventSet.EndDate || DateTime.Now <= eventSet.OpenDate)
            {
                Response.Redirect("~/close-error");
            }
            if (ConfigSettings.GetBoolean("IsProd") && (!eventSet.Active))
            {
                Response.Redirect("~/close-error");
            }
           
            List<O_EVENT_CYCLE> eventCycles = EventCyclesController.GetEventCycles(CurrentContext.EventId).Value.OrderBy(c => c.CYCLE_START_DATE).ToList();

            if (eventCycles.Count == 1) 
            {
                CurrentContext.CycleId = eventCycles[0].CYCLE_SEQ_NO.ToInt32();
                Response.RedirectToRoute("wizard");
            }
            else
            {
                if (CurrentContext.ParamInfo["vacation_date"].ToString() != "")
                {
                    List<O_EVENT_CYCLE> eventCyclesInDate = eventCycles.Where(ev => DateTime.Parse(ev.CYCLE_START_DATE.ToString()) == (DateTime.Parse(CurrentContext.ParamInfo["vacation_date"].ToString()))).ToList();
                    hasCycle = eventCyclesInDate.Count() > 0 ? true : false;
                }
                lvEventCycles.DataSource = eventCycles;//.Where(c => c.ROOM_MATES_NO == 0);
                lvEventCycles.DataBind();
            }

            ltrTextMarketingTitle.Text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 9, base.Lang);
            ltrTextMarketing.Text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 10, base.Lang);
            btnContinueText.InnerText = TextsController.GetText(CurrentContext.EventId, 14, base.Lang);
            ltrTitle.Text = TextsController.GetText(CurrentContext.EventId, 15, base.Lang);
            //ltrRoommates.Text = TextsController.GetText(CurrentContext.EventId, 345, base.Lang);
            //ltrRoommatesNo.Text = TextsController.GetText(CurrentContext.EventId, 346, base.Lang);
            //ltrRoommatesName1.Text = ltrRoommatesName2.Text = TextsController.GetText(CurrentContext.EventId, 347, base.Lang);
            //ltrRoommatesPhone1.Text = ltrRoommatesPhone2.Text = TextsController.GetText(CurrentContext.EventId, 348, base.Lang);
            //ltrRoommatesId1.Text = ltrRoommatesId2.Text = TextsController.GetText(CurrentContext.EventId, 348, base.Lang);
            //Id1NoExists.Text = Id2NoExists.Text = TextsController.GetTextHtmlFormat(CurrentContext.EventId, 450, base.Lang);

            //if (byPhone)
            //{
            //    RoommatePhone1.Visible = true;
            //    RoommatePhone2.Visible = true;
            //    customerPhone.Value = CurrentContext.ParamInfo["phone_no_1"].ToString();
            //}
            //else
            //{
            //    RoommateId1.Visible = true;
            //    RoommateId2.Visible = true;
            //}
            base.SetPageMessage(39, 123, 238, 239, 330, 331,326, 327, 328 ,329, 400, 401, 420, 421, 422, 426, 434, 435, 438, 439, 440, 450);
        }

        protected void lvEventCycles_ItemDataBound(object sender, ListViewItemEventArgs e)
        {
            O_EVENT_CYCLE eventCycle = e.Item.DataItem as O_EVENT_CYCLE;

            Literal ltrCycleText = e.Item.FindControl("ltrCycleText") as Literal;
            if (eventCycle.STATUS_CODE == -1)
            {
                ltrCycleText.Text = TextsController.GetText(CurrentContext.EventId, 138, base.Lang);
            }
            else
            {
                ltrCycleText.Text = TextsController.GetText(CurrentContext.EventId, 139, base.Lang);
            }
            RadioButton rbCycle = e.Item.FindControl("rbCycle") as RadioButton;

            if (hasCycle)
            {
             if (DateTime.Parse(eventCycle.CYCLE_START_DATE.ToString()) == DateTime.Parse(CurrentContext.ParamInfo["vacation_date"].ToString()))
                    rbCycle.Checked = true;                  
            }
            DateTime monthCycle = eventCycle.CYCLE_START_DATE;
            rbCycle.Attributes.Add("data-cycleid", eventCycle.CYCLE_SEQ_NO.ToString());
            rbCycle.Attributes.Add("data-eventid", eventCycle.EVENTSN.ToString());
            rbCycle.Attributes.Add("data-monthid", monthCycle.Month.ToString());

            EventCycle eventCycleText = EventsController.GetEventCycle(CurrentContext.EventId, eventCycle.CYCLE_SEQ_NO.ToInt32(), base.Lang);
            rbCycle.Text = string.Format("{0} - {1} ({2})", eventCycle.CYCLE_END_DATE.ToShortDateString(), eventCycle.CYCLE_START_DATE.ToShortDateString(), eventCycleText != null ? eventCycleText.TextMarketing : string.Empty);
            rbCycle.Enabled = eventCycle.CYCLE_START_DATE > DateTime.Today && eventCycle.STATUS_CODE == -1&& !hasCycle;
        }

        protected void btnContinue_Click(object sender, EventArgs e)
        {
            if (hfSelectedCycle.Value.IsNotNullOrEmpty())
            {
                int cycleId = 0;
                int.TryParse(hfSelectedCycle.Value, out cycleId);
                bool canContinue = true;

               // M_SHARING_PAX sharingPax = null;
               // int roommatesNo = cycleId;
               // CurrentContext.RoommateNO = roommatesNo;

               //if(byPhone)
               // {
               //     if (roommatesNo > 0)
               //     {
               //         sharingPax = new M_SHARING_PAX();
               //         sharingPax.Value = new O_SHARING_PAX[roommatesNo];
               //         int phoneNumber = 0, phoneArea_code = 0;
               //         int.TryParse(txtRoommate1Phone.Text, out phoneNumber);
               //         int.TryParse(txtRoommate1Area_code.Text, out phoneArea_code);
               //         O_PHONE phone = new O_PHONE() { PHONE_NO = phoneNumber, AREA_CODE = phoneArea_code, PHONE_NOIsNull = false, AREA_CODEIsNull = false};
               //         sharingPax.Value[0] = new O_SHARING_PAX() { PAX_NAME = txtRoommate1Name.Text, PHONE = phone};
               //         if (roommatesNo > 1)
               //         {
               //           int.TryParse(txtRoommate2Phone.Text, out phoneNumber);
               //           int.TryParse(txtRoommate2Area_code.Text, out phoneArea_code);
               //           phone = new O_PHONE() { PHONE_NO = phoneNumber, AREA_CODE = phoneArea_code, PHONE_NOIsNull = false, AREA_CODEIsNull = false};
               //           sharingPax.Value[1] = new O_SHARING_PAX() { PAX_NAME = txtRoommate2Name.Text, PHONE = phone };
               //         }
               //     }
               // }
               // //byId
               // else
               // {
               //     if (roommatesNo > 0)
               //     {
               //         string roomateId;
               //         int ExistsId1 = EventCyclesController.ExistsId(EventId, txtRoommate1Id.Text);
               //         if (ExistsId1 == 0)
               //         {
               //             Id1NoExists.Visible = true;
               //             canContinue = false;
               //         }
               //         else
               //         {
               //             Id1NoExists.Visible = false;
               //             sharingPax = new M_SHARING_PAX();
               //             sharingPax.Value = new O_SHARING_PAX[roommatesNo];                            
               //             roomateId = txtRoommate1Id.Text;
               //             sharingPax.Value[0] = new O_SHARING_PAX() { PAX_NAME = txtRoommate1Name.Text, ID_NO = roomateId };
               //         }                        
               //         if (roommatesNo > 1)
               //         {
               //             int ExistsId2 = EventCyclesController.ExistsId(EventId, txtRoommate2Id.Text);
               //             if (ExistsId2 == 0)
               //             {
               //                 Id2NoExists.Visible = true;
               //                 canContinue = false;
               //             }
               //             else
               //             {
               //                 Id2NoExists.Visible = false;
               //                 if (ExistsId1 == 1)
               //                 {
               //                     roomateId = txtRoommate2Id.Text;
               //                     sharingPax.Value[1] = new O_SHARING_PAX() { PAX_NAME = txtRoommate2Name.Text, ID_NO = roomateId };
               //                 }                                
               //             }                            
               //         }
               //     }
               // }

               // CurrentContext.SharingPax = sharingPax;

                List<O_EVENT_CYCLE> eventCycles = EventCyclesController.GetEventCycles(CurrentContext.EventId).Value.ToList();

                O_EVENT_CYCLE selectCycleDate = eventCycles.FirstOrDefault(c => c.CYCLE_SEQ_NO == cycleId);

                //O_EVENT_CYCLE selectCycle = eventCycles.FirstOrDefault(c => c.STATUS_CODE == -1 &&
                //c.ROOM_MATES_NO == CurrentContext.RoommateNO
                //&& c.CYCLE_START_DATE == selectCycleDate.CYCLE_START_DATE && c.CYCLE_END_DATE == selectCycleDate.CYCLE_END_DATE);

                O_EVENT_CYCLE selectCycle = eventCycles.FirstOrDefault(c => c.STATUS_CODE == -1 &&
                c.CYCLE_START_DATE == selectCycleDate.CYCLE_START_DATE && c.CYCLE_END_DATE == selectCycleDate.CYCLE_END_DATE);

                //cycleId = selectCycle.CYCLE_SEQ_NO.ToInt32() ;
                CurrentContext.CycleId = cycleId;
                if (canContinue)
                {
                    Response.Redirect("form-wizard");
                }                
            }  
              
            
        }
    }
}