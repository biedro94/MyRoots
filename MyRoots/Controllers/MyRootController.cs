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
using System.Web.Script.Serialization;
using Newtonsoft.Json;
using System.IO;
using System.Drawing;
using System.Web.Helpers;
using System.Web.Script.Services;
using System.Threading.Tasks;

namespace MyRoots.Controllers
{
    public class MyRootController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;

        public MyRootController()
        {
        }

        public MyRootController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
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

        public static ApplicationDbContext db = new ApplicationDbContext();


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

        public ActionResult ChangePassword()
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
            string jsonData = Request.Form[0];

            FamilyMember fm = new FamilyMember();
            FamilyMember tmpfm = new FamilyMember();

            fm = JsonConvert.DeserializeObject<FamilyMember>(jsonData);

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

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, change to shouldLockout: true
            var result = await SignInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, shouldLockout: false);
            switch (result)
            {
                case SignInStatus.Success:
                    return RedirectToAction("Index", "MyRoot");
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.RequiresVerification:
                    return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = model.RememberMe });
                case SignInStatus.Failure:
                default:
                    ModelState.AddModelError("", "Wprowadzono niepoprawne dane.");
                    return View();
            }
        }

        public ActionResult Register()
        {

            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email, FirstName = model.FirstName, LastName = model.LastName };
                var result = await UserManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);

                    // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=320771
                    // Send an email with this link
                    // string code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
                    // var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
                    // await UserManager.SendEmailAsync(user.Id, "Confirm your account", "Please confirm your account by clicking <a href=\"" + callbackUrl + "\">here</a>");

                    return RedirectToAction("Index", "MyRoot");
                }
              
            }
            ModelState.AddModelError("", "Wprowadzono niepoprawne dane.");
            // If we got this far, something failed, redisplay form
            return View(model);
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

        [HttpPost]
        public void UploadAvatarr(String img)
        {
            if(String.IsNullOrEmpty(img))
            {

            }
        }

        [HttpPost]
        public ActionResult UploadAvatar()
        {
            string userId = User.Identity.GetUserId();
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

        [HttpPost]
        public bool ChangeUserData()
        {
            string jsonData = Request.Form[0];
            //ApplicationUser tmpfm = new ApplicationUser();

            //tmpfm = JsonConvert.DeserializeObject<ApplicationUser>(jsonData);

            var tmpjsonData = JsonConvert.DeserializeObject(jsonData);

            //string userId = User.Identity.GetUserId();
            //var appUserTmp = db.Users.Where(c => c.Id == userId).FirstOrDefault();

            //if (tmpfm.FirstName != "" && tmpfm.LastName !="" && tmpfm.Image !="")
            //{
            //    appUserTmp.FirstName = tmpfm.FirstName;
            //    appUserTmp.LastName = tmpfm.LastName;
            //    appUserTmp.Image = tmpfm.Image;

            //    db.Entry(appUserTmp).State = EntityState.Modified;
            //    db.SaveChanges();

            //    return true;
            //}

            return false;
        }
    }
   }
