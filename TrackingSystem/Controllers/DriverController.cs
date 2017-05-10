using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TrackingSystem.DataAccessLayer;
using TrackingSystem.Models;

namespace TrackingSystem.Controllers
{
    public class DriverController : Controller
    {
        //
        // GET: /Driver/

        //public ActionResult GetLocation()
        //{
        //    return View();
        //}
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        [HttpGet]
        public ActionResult Login()
        {
            ViewBag.Text = "GET";
            return View();
        }
        [HttpPost]
        public ActionResult Login(UserDetails user)
        {
            string name="name";
            Session["UserName"] = "";
            AccountDBOperations account = new AccountDBOperations();
            bool result = account.CheckCredentials(user.UserName, user.PassWord);
            try
            {
                if (result)
                {
                   // Session["UserName"] = user.UserName.ToString();

                   // name = (string)Session["UserName"];
                    return Content(name);
                    // return View();
                }

                else
                {
                    return Content("please enter valid Credentials");
                }
            }
            catch(Exception exception)
            {
                log.Fatal(exception.Message, exception);
                return Content("sorry, some error occured");
            }
        }
      


        /// <summary>
        /// get user current location and display the location and opens the chat box
        /// </summary>
        /// <returns> returns to the view GeoFence</returns>
        public ActionResult GeoFence()
        {
            return View();
        }
        /// <summary>
        /// gets locationDetails and pass the data to data access layer 
        /// </summary>
        /// <param name="location"></param>
        /// <returns>return whether the location details updated or not</returns>
        [HttpPost]
        public ActionResult GeoFence(LocationDetails location)
        {
            try
            {
                SQLOperations maps = new SQLOperations();
                bool result = maps.AddLocationDetails(location);
                if (result)
                {
                    //return null;
                    return Content("your Details are updated");
                }
                else
                    return Content("sorry some error occured");
            }
            catch (Exception exception)
            {
                log.Fatal(exception.Message, exception);
                return Content("sorry, some error occured");
            }
        }
    }
}
