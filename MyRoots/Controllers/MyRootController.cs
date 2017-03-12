using MyRoots.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System.Data.Entity;

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

        public FamilyMember CreateFamilyMember(string FirstName,string LastName,DateTime dateOfBirth,DateTime dateOfDeath,string BirthPlace,string Description,string Image,int DegreeOfRelationshipId)
        {
            string userId = User.Identity.GetUserId();
            int treeId = db.Trees
                .Where(c => c.ApplicationUser.Id == userId)
                .Select(c => c.TreeId).FirstOrDefault();

            FamilyMember fm = new FamilyMember();
            fm.FirstName = FirstName;
            fm.LastName = LastName;
            fm.DateOfBirth = dateOfBirth;
            fm.DateOfDeath = dateOfDeath;
            fm.BirthPlace = BirthPlace;
            fm.Description = Description;
            fm.Image = Image;
            fm.DegreeOfRelationship = db.DegreesOfRelationship.Where(c => c.DegreeOfRelationshipId == DegreeOfRelationshipId).FirstOrDefault();
            fm.Tree = db.Trees.Where(c => c.TreeId == treeId).FirstOrDefault();

            db.FamilyMembers.Add(fm);
            db.SaveChanges();

            return fm;
        }

        public void DeleteTree()
        {
            string userId = User.Identity.GetUserId();
            int treeId = db.Trees
                .Where(c => c.ApplicationUser.Id == userId)
                .Select(c => c.TreeId).FirstOrDefault();

            foreach (var familyMember in db.FamilyMembers.Where(c => c.Tree.TreeId == treeId))
            {
                db.FamilyMembers.Remove(familyMember);
                db.SaveChanges();
            }

            Tree tree = db.Trees.Where(c => c.TreeId == treeId).FirstOrDefault();

            db.Trees.Remove(tree);
            db.SaveChanges();
        }

        public void DeleteFamilyMember(int fmId)
        {
            string userId = User.Identity.GetUserId();
            int treeId = db.Trees
                .Where(c => c.ApplicationUser.Id == userId)
                .Select(c => c.TreeId).FirstOrDefault();

            FamilyMember fm = db.FamilyMembers.Where(c => c.Id == fmId).FirstOrDefault();

            db.FamilyMembers.Remove(fm);
            db.SaveChanges();
        }

        public Tree EditTree(string Name)
        {
            string userId = User.Identity.GetUserId();
            int treeId = db.Trees
                .Where(c => c.ApplicationUser.Id == userId)
                .Select(c => c.TreeId).FirstOrDefault();

            Tree tree = db.Trees.Where(c => c.TreeId == treeId).FirstOrDefault();
            tree.TreeName = Name;

            db.Entry(tree).State = EntityState.Modified;
            db.SaveChanges();

            return tree;
        }

        public FamilyMember EditFamilyMember(int fmId, string FirstName, string LastName, DateTime dateOfBirth, DateTime dateOfDeath, string BirthPlace, string Description, string Image, int DegreeOfRelationshipId)
        {
            string userId = User.Identity.GetUserId();
            int treeId = db.Trees
                .Where(c => c.ApplicationUser.Id == userId)
                .Select(c => c.TreeId).FirstOrDefault();

            FamilyMember fm = db.FamilyMembers.Where(c => c.Id == fmId).FirstOrDefault();
            fm.FirstName = FirstName;
            fm.LastName = LastName;
            fm.DateOfBirth = dateOfBirth;
            fm.DateOfDeath = dateOfDeath;
            fm.BirthPlace = BirthPlace;
            fm.Description = Description;
            fm.Image = Image;
            fm.DegreeOfRelationship = db.DegreesOfRelationship.Where(c => c.DegreeOfRelationshipId == DegreeOfRelationshipId).FirstOrDefault();
            fm.Tree = db.Trees.Where(c => c.TreeId == treeId).FirstOrDefault();

            db.Entry(fm).State = EntityState.Modified;
            db.SaveChanges();

            return fm;
        }

        public ICollection<FamilyMember> GetAllFamilyMembers()
        {
            List<FamilyMember> list = new List<FamilyMember>();

            string userId = User.Identity.GetUserId();
            int treeId = db.Trees
                .Where(c => c.ApplicationUser.Id == userId)
                .Select(c => c.TreeId).FirstOrDefault();

            foreach (FamilyMember fm in db.FamilyMembers.Where(c => c.Tree.TreeId == treeId))
            {
                list.Add(fm);
            }

            return list;
        }


        public ActionResult Login()
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "MyRoot");
            }
            else
            {
                return View();
            }            
        }

        public ActionResult Index()
        {
            return View();
        }

    }
}