using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TrackingSystem.Models
{
    public class UserDetails
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string PassWord { get; set; }
        public string EmailID { get; set; }
        public long MobileNumber { get; set; }
    }
}