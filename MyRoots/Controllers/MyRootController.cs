using MyRoots.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace MyRoots.Controllers
{
    public class MyRootController : Controller
    {
        public static ApplicationDbContext db = new ApplicationDbContext();

        [HttpGet]
        public string GetUserEmail()
        {
            string userId = User.Identity.GetUserId();

            if(userId != null)
            {
                var query = db.Users
                    .Where(c => c.Id == userId)
                    .Select(c => c.Email).FirstOrDefault();

                return query;
            }
            else
            {
                return "Użytkownik niezalogowany";
            }
        }

        [HttpGet]
        public string GetFirstNameAndLastName()
        {
            string userId = User.Identity.GetUserId();

            if (userId != null)
            {
                var queryFirstName = db.Users
                    .Where(c => c.Id == userId)
                    .Select(c => c.FirstName).FirstOrDefault();

                var queryLastName = db.Users
                    .Where(c => c.Id == userId)
                    .Select(c => c.LastName).FirstOrDefault();

                string query = queryFirstName + " " + queryLastName;

                return query;
            }
            else
            {
                return "Użytkownik niezalogowany";
            }
        }








        public static List<T> GetCollection<T>(string storedProcedure, object args)
        where T : class, new()
        {
            List<T> result = new List<T>();

            var queryResult = db.Database.SqlQuery<T>(storedProcedure, args);

            if (queryResult.HasValue())
            {
                result = queryResult.AsEnumerable().ToList<T>();
            }
            
            return result;
        }

        public static T GetObject<T>(string storedProcedure, object args)
        where T : class, new()
        {
            T result = new T();

            var queryResult = db.Database.SqlQuery<T>(storedProcedure, args);

            if (queryResult.HasValue())
            {
                result = queryResult.AsEnumerable().FirstOrDefault();
            }

            return result;
        }


        public static T GetScalar<T>(string storedProcedure, object args)
        where T : struct
        {
            T result = default(T);

            var queryResult = db.Database.SqlQuery<T>(storedProcedure, args);

            if (queryResult.HasValue())
            {
                result = queryResult.FirstOrDefault<T>();
            }
            
            return result;
        }

        public static T GetScalar<T>(string storedProcedure)
        where T : struct
        {
            T result = default(T);

            var queryResult = db.Database.SqlQuery<T>(storedProcedure);

            if (queryResult.HasValue())
            {
                result = queryResult.FirstOrDefault<T>();
            }

            return result;
        }



    }
}