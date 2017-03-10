using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyRoots.Controllers
{
    public static class Extensions
    {

        public static bool HasValue<T>(this IEnumerable<T> queryResult)
        {
            if (queryResult != null && queryResult.AsEnumerable().Any())
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}