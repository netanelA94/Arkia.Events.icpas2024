using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Arkia.Events.BusinessControllers;
using Arkia.Events.BusinessEntities;

namespace Arkia.Events.LC2014.UI.Controls
{
    public partial class RGS03 : BaseUserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ltrTitle.Text = TextsController.GetText(EventId, 27, base.Lang);
            btnContinueText.InnerText = TextsController.GetText(EventId, 16, base.Lang);
            Event eventSet = EventsController.GetEvent(EventId);
            passportBox.Visible = eventSet.Passport;


            id.Value = CurrentContext.ParamInfo["id_no"].ToString();
            if (!string.IsNullOrWhiteSpace(CurrentContext.ParamInfo["first_name"].ToString()))
            {
                firstname.Value = CurrentContext.ParamInfo["first_name"].ToString().Replace("(", "").Replace(")", "").Replace("\"", "").Replace(".", ""); 
            }
            else
            {
                firstname.Disabled = false;
            }
            if (!string.IsNullOrWhiteSpace(CurrentContext.ParamInfo["last_name"].ToString()))
            {
                lastname.Value = CurrentContext.ParamInfo["last_name"].ToString().Replace("(", "").Replace(")", "").Replace("\"", "").Replace(".", "");
            }
            else
            {
                lastname.Disabled = false;
            }
            if (!string.IsNullOrWhiteSpace(CurrentContext.ParamInfo["email"].ToString()))
            {
                email.Value = CurrentContext.ParamInfo["email"].ToString();
            }
            else
            {
                email.Disabled = false;
            }
            string phone1 = CurrentContext.ParamInfo["phone_no_1"].ToString();
            if (!string.IsNullOrWhiteSpace(phone1))
            {
                if (phone1.Length == 10)
                {
                    area_code.Value = CurrentContext.ParamInfo["phone_no_1"].ToString().Substring(0, 3);
                    phone.Value = CurrentContext.ParamInfo["phone_no_1"].ToString().Substring(3, 7);
                }
                else  if (phone1.Length == 9)
                {
                    area_code.Value = CurrentContext.ParamInfo["phone_no_1"].ToString().Substring(0, 2);
                    phone.Value = CurrentContext.ParamInfo["phone_no_1"].ToString().Substring(2, 7);
                }
            }
            else
            {
                area_code.Disabled = false;
                phone.Disabled = false;
            }
        }
    }
}