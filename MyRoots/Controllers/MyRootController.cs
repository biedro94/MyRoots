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

        public Tree CreateTree(string treeName)
        {
            string userid = User.Identity.GetUserId();
            Tree tree = new Tree();
            tree.TreeName = treeName;
            tree.DateOfCreation = DateTime.Now;
            tree.ApplicationUser = db.Users.Where(c => c.Id == userid).FirstOrDefault();
            
            db.Trees.Add(tree);
            db.SaveChanges();

            return tree;
        }


        public ActionResult Login()
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "MyRoot");
            }else
            {
                return View();
            }            
        }

        public ActionResult Index()
        {
            return View();
        }



        //[HttpGet]
        //public string GetUserEmail()
        //{
        //    string userId = User.Identity.GetUserId();
        //    return MyRootController.GetString<string>("MyRoots_GetUserEmail", new { userId = userId });
        //    var queryResult = db.Database.SqlQuery<string>("MyRoots_GetUserEmail @userId", new SqlParameter("@userId", userId));

        //    string result = default(string);

        //    if (queryResult.HasValue())
        //    {
        //        result = queryResult.FirstOrDefault<string>();
        //    }

        //    return result;
        //}



        //public static List<T> GetCollection<T>(string storedProcedure, object args)
        //where T : class, new()
        //{
        //    List<T> result = new List<T>();

        //public static List<T> GetCollection<T>(string storedProcedure, object args)
        //where T : class, new()
        //{
        //    List<T> result = new List<T>();


        //    var queryResult = db.Database.SqlQuery<T>(storedProcedure, args);

        //    if (queryResult.HasValue())
        //    {
        //        result = queryResult.AsEnumerable().ToList<T>();
        //    }

        //    return result;
        //}

        //public static T GetObject<T>(string storedProcedure, object args)
        //where T : class, new()
        //{
        //    T result = default(T);

        //    var queryResult = db.Database.SqlQuery<T>(storedProcedure, args);

        //    if (queryResult.HasValue())
        //    {
        //        result = queryResult.AsEnumerable().FirstOrDefault();
        //    }

        //    return result;
        //}


        //public static T GetScalar<T>(string storedProcedure, object args)
        //where T : struct
        //{
        //    T result = default(T);

        //    var queryResult = db.Database.SqlQuery<T>(storedProcedure, args);

        //    if (queryResult.HasValue())
        //    {
        //        result = queryResult.FirstOrDefault<T>();
        //    }

        //    return result;
        //}

        //public static T GetScalar<T>(string storedProcedure)
        //where T : struct
        //{
        //    T result = default(T);

        //    var queryResult = db.Database.SqlQuery<T>(storedProcedure);

        //    if (queryResult.HasValue())
        //    {
        //        result = queryResult.FirstOrDefault<T>();
        //    }

        //    return result;
        //}

        //public static T GetString<T>(string storedProcedure)
        //{
        //    T result = default(T);

        //    var queryResult = db.Database.SqlQuery<T>(storedProcedure);

        //    if (queryResult.HasValue())
        //    {
        //        result = queryResult.FirstOrDefault<T>();
        //    }

        //    return result;
        //}

        //public static T GetString<T>(string storedProcedure, object args)
        //{

        //    T result = default(T);

        //    var queryResult = db.Database.SqlQuery<T>(storedProcedure, args);

        //    if (queryResult.HasValue())
        //    {
        //        result = queryResult.FirstOrDefault<T>();
        //    }

        //    return result;
        //}



    }
}