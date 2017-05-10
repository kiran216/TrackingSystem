using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TrackingSystem.DataAccessLayer;
using TrackingSystem.Models;
using System.Web.Script.Serialization;
using Microsoft.AspNet.SignalR;
using TrackingSystem.Hubs;

namespace TrackingSystem.Controllers
{
    public class HomeController : Controller
    {
        SQLOperations operation = new SQLOperations();
        //
        // GET: /Home/
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        /// <summary>
        /// start page 
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            log.Info("super");
            return View();
        }
        /// <summary>
        /// get the drivers list from Db layer and sends to view
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult ShowDrivers()
        {
            List<string> names = operation.GetUserNames();
            return View(names);
        }
        /// <summary>
        /// get the particular driver name from view by which the latest relevant data about that driver
        /// is retrived  and pass to view as json data
        /// </summary>
        /// <param name="name"></param>
        /// <returns>json data of the latest details of particular user</returns>
        [HttpPost]
        public ActionResult getDriversJson(string name)
        {
            List<LocationDetails> details = operation.GetLatestDetails(name);
            return Json(details, JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult GetAllLocationDetailsJson()
        {
            List<LocationDetails> Details = operation.GetAllLocationDetails();
            return Json(Details, JsonRequestBehavior.AllowGet);
        }
        public ActionResult SendMessage()
        {
            return View();
        }
        public ActionResult ShowHistory()
        {
            List<string> names = operation.GetUserNames();
            return View(names);
        }
        [HttpPost]
        public ActionResult ShowHistory(string name)
        {
            List<LocationDetails> details = operation.GetAllLocations(name);
            return Json(details, JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// Adding new user
        /// </summary>
        /// <returns></returns>

        public ActionResult AddUser()
        {
            return View();
        }
        [HttpPost]
        public ActionResult AddUser(UserDetails user)
        {
            bool result = operation.AddNewUser(user);
            if (result)
            {
                return RedirectToAction("AddUser","Home");
            }
            else {
                return JavaScript("<script>alert(\"user name already Exists, please enter another UserName\")</script>");


                //return 
                
            }
        }
       
    }
}
