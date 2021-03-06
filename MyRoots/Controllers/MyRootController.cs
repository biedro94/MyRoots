﻿using MyRoots.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System.Data.Entity;
using System.Web.Script.Serialization;
using Newtonsoft.Json;
using System.IO;
using System.Drawing;
using System.Web.Helpers;
using System.Web.Script.Services;
using System.Threading.Tasks;
using System.Text;

namespace MyRoots.Controllers
{
    public class MyRootController : Controller
    {
        public static ApplicationDbContext db = new ApplicationDbContext();
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;


        [HttpGet]
        public string GetUserEmail()
        {
            string userId = User.Identity.GetUserId();

            if (userId != null)
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

        public ActionResult SettingsTree()
        {
            return View();
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

        [HttpPost]
        public string CreateTree(string treeName)
        {
            string userid = User.Identity.GetUserId();

            if (db.Trees.Any(c => c.ApplicationUser.Id == userid))
            {
                return "Dla tego użytkownika jest już utworzone drzewo";
            }
            else
            {
                Tree tree = new Tree();
                tree.TreeName = treeName;
                tree.DateOfCreation = DateTime.Now;
                tree.ApplicationUser = db.Users.Where(c => c.Id == userid).FirstOrDefault();

                db.Trees.Add(tree);
                db.SaveChanges();
                return "Pomyślnie dodano drzewo";
            }
        }

        [HttpPost]
        public bool CreateFamilyMember()
        {
            FamilyMember fm = new FamilyMember();
            FamilyMember tmpfm = new FamilyMember();
            var jsonString = String.Empty;
            this.HttpContext.Request.InputStream.Position = 0;

            using (var inputStream = new StreamReader(this.HttpContext.Request.InputStream))
            {
                jsonString = inputStream.ReadToEnd();
            }

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            fm = serializer.Deserialize<FamilyMember>(jsonString);

            string userId = User.Identity.GetUserId();
            int treeId = db.Trees
                .Where(c => c.ApplicationUser.Id == userId)
                .Select(c => c.TreeId).FirstOrDefault();

            tmpfm.FirstName = fm.FirstName;
            tmpfm.LastName = fm.LastName;
            tmpfm.DateOfBirth = fm.DateOfBirth;
            tmpfm.DateOfDeath = fm.DateOfDeath;
            tmpfm.BirthPlace = fm.BirthPlace;
            tmpfm.Description = fm.Description;
            tmpfm.Image = fm.Image;
            tmpfm.DegreeOfRelationship = db.DegreesOfRelationship.Where(c => c.DegreeOfRelationshipId == fm.DegreeOfRelationship.DegreeOfRelationshipId).FirstOrDefault();

            tmpfm.Tree = db.Trees.Where(c => c.TreeId == treeId).FirstOrDefault();

            db.FamilyMembers.Add(tmpfm);
            db.SaveChanges();

            return true;
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

        [HttpGet]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetTree()
        {
            string userId = User.Identity.GetUserId();
            int treeId = db.Trees
                .Where(c => c.ApplicationUser.Id == userId)
                .Select(c => c.TreeId).FirstOrDefault();

            Tree tree = db.Trees.Where(c => c.TreeId == treeId).FirstOrDefault();

            return new JavaScriptSerializer().Serialize(tree);
        }

        //public FamilyMember EditFamilyMember(int fmId, string FirstName, string LastName, DateTime dateOfBirth, DateTime dateOfDeath, string BirthPlace, string Description, string Image, int DegreeOfRelationshipId)
        //{
        //    string userId = User.Identity.GetUserId();
        //    int treeId = db.Trees
        //        .Where(c => c.ApplicationUser.Id == userId)
        //        .Select(c => c.TreeId).FirstOrDefault();

        //    FamilyMember fm = db.FamilyMembers.Where(c => c.Id == fmId).FirstOrDefault();
        //    fm.FirstName = FirstName;
        //    fm.LastName = LastName;
        //    fm.DateOfBirth = dateOfBirth;
        //    fm.DateOfDeath = dateOfDeath;
        //    fm.BirthPlace = BirthPlace;
        //    fm.Description = Description;
        //    fm.Image = Image;
        //    fm.DegreeOfRelationship = db.DegreesOfRelationship.Where(c => c.DegreeOfRelationshipId == DegreeOfRelationshipId).FirstOrDefault();
        //    fm.Tree = db.Trees.Where(c => c.TreeId == treeId).FirstOrDefault();

        //    db.Entry(fm).State = EntityState.Modified;
        //    db.SaveChanges();

        //    return fm;
        //}

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

        public ActionResult Register()
        {

            return View();
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult TreeView()
        {
            return View();
        }
        public ActionResult AccountManagement()
        {
            return View();
        }

        public ActionResult ForgotPassword()
        {
            return RedirectToAction("ForgotPassword", "Account");
        }



        [HttpGet]
        public string GetFirstName()
        {
            string userId = User.Identity.GetUserId();

            if (userId != null)
            {
                var queryUser = db.Users
                    .Where(c => c.Id == userId)
                    .FirstOrDefault();
                return queryUser.FirstName;
            }
            else
                return "";

        }

        [HttpGet]
        public string GetLastName()
        {
            string userId = User.Identity.GetUserId();

            if (userId != null)
            {
                var queryUser = db.Users
                    .Where(c => c.Id == userId)
                    .FirstOrDefault();
                return queryUser.LastName;
            }
            else
                return "";
        }

        [HttpGet]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetUser()
        {
            string userId = User.Identity.GetUserId();

            if (userId != null)
            {
                var queryUser = db.Users
                    .Where(c => c.Id == userId)
                    .FirstOrDefault();
                return new JavaScriptSerializer().Serialize(queryUser);
            }
            else
                return null;
        }

     /*   [HttpPost]
        public void UploadAvatarr(String img)
        {
            if(String.IsNullOrEmpty(img))
            {

            }
        }*/

        [HttpPost]
        public ActionResult UploadAvatar()
        {
            string userId = User.Identity.GetUserId();
            if(Request.Params.Count > 0)
            {
                var json = Request.Params.Keys[0]  +'"' + "}";
                string jsonData = Request.Form[0];
                try
                {
                    ImageChange tmpfm = new ImageChange();

                    tmpfm = JsonConvert.DeserializeObject<ImageChange>(jsonData);

                    if (tmpfm.image != "")
                    {
                        byte[] imageBytes = Encoding.ASCII.GetBytes(tmpfm.image);
                        string base64String = Convert.ToBase64String(imageBytes, 0, imageBytes.Length);
                        byte[] imageBytes1 = Convert.FromBase64String(base64String);
                        string filePath = Server.MapPath("~/Images/" + tmpfm.imageName);

                        using (var imageFile = new FileStream(filePath, FileMode.Create))
                        {
                            imageFile.Write(imageBytes1, 0, imageBytes1.Length);
                            imageFile.Flush();
                        }

                        /* Image image;
                         using (MemoryStream ms = new MemoryStream(imageBytes))
                         {
                             image = Image.FromStream(ms);
                         }*/


                   //     System.IO.File.WriteAllBytes(filePath, imageFile);
                        // BinaryWriter writer = null;

                        var queryUser = db.Users
                .Where(c => c.Id == userId).FirstOrDefault();
                        queryUser.Image = tmpfm.imageName;

                        db.Entry(queryUser).State = EntityState.Modified;
                        db.SaveChanges();

                        return RedirectToAction("AccountManagement", "MyRoot");
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }

            }
            if (Request.Files.Count > 0)
            {
                var file = Request.Files[0];

                if (file != null && file.ContentLength > 0)
                {
                    var fileName = Path.GetFileName(file.FileName);
                    byte[] imageAsBytes = new byte[file.ContentLength];

                    using (BinaryReader reader = new BinaryReader(file.InputStream))
                    {
                        imageAsBytes = reader.ReadBytes(file.ContentLength);
                    }

                    string thePicture = Convert.ToBase64String(imageAsBytes);

                    var queryUser = db.Users
                    .Where(c => c.Id == userId).FirstOrDefault();
                    queryUser.Image = thePicture;
                    
                    db.Entry(queryUser).State = EntityState.Modified;
                    db.SaveChanges();
                }
            }
            return RedirectToAction("AccountManagement", "MyRoot");
        }

        [HttpGet]
        public string GetAvatarForUser()
        {
            string userId = User.Identity.GetUserId(); 

            if (userId != null)
            {
                var queryImage = db.Users
                    .Where(c => c.Id == userId)
                    .Select(c => c.Image)
                    .FirstOrDefault();
                if (queryImage != null)
                    return  queryImage;
                else
                    return null;
            }
            else
                return null; 
        }


        //
        // GET: /MyRoot/ChangePassword
        public ActionResult ChangePassword()
        {
            return View();
        }

        //
        // POST: /MyRoot/ChangePassword
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ChangePassword(ChangePasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var result = await UserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword, model.NewPassword);
            if (result.Succeeded)
            {
                var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
                if (user != null)
                {
                    await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                }
                return RedirectToAction("Index", new { Message = ManageMessageId.ChangePasswordSuccess });
            }
            ModelState.AddModelError("", "Wprowadzono nie poprawne dane");
            //   AddErrors(result);
            return View(model);
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }


        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }




        [HttpPost]
        public bool ChangeUserData()
        {
            string jsonData = Request.Form[0];
            ApplicationUser tmpfm = new ApplicationUser();

            tmpfm = JsonConvert.DeserializeObject<ApplicationUser>(jsonData);

            string userId = User.Identity.GetUserId();
            var appUserTmp = db.Users.Where(c => c.Id == userId).FirstOrDefault();

            if (tmpfm.FirstName != "" && tmpfm.LastName !="" )//&& tmpfm.Image !="")
            {
                appUserTmp.FirstName = tmpfm.FirstName;
                appUserTmp.LastName = tmpfm.LastName;
               // appUserTmp.Image = tmpfm.Image;

                db.Entry(appUserTmp).State = EntityState.Modified;
                db.SaveChanges();

                return true;
            }

            return false;
        }
        public enum ManageMessageId
        {
            AddPhoneSuccess,
            ChangePasswordSuccess,
            SetTwoFactorSuccess,
            SetPasswordSuccess,
            RemoveLoginSuccess,
            RemovePhoneSuccess,
            Error
        }

    }
   }
