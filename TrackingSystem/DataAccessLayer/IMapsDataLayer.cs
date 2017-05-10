using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TrackingSystem.Models;

namespace TrackingSystem.DataAccessLayer
{
    interface IMapsDataLayer
    {
        bool AddLocationDetails(LocationDetails location);
    }
}
