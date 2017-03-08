using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace MyRoots
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {

                routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

                routes.MapRoute(
                    name: "Default",
                    url: "{controller}/{action}/{id}",
                    defaults: new { controller = "MyRoot", action = "Login", id = UrlParameter.Optional }
                );
        }
    }
}
