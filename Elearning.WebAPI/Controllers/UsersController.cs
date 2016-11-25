using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Elearning.WebAPI;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Elearning.WebAPI.Models;

namespace Elearning.WebAPI.Controllers
{
    public class UsersController : ApiController
    {
        private ElearningContext db = new ElearningContext();

        private readonly JsonSerializerSettings _serializerSettings = new JsonSerializerSettings {
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
            NullValueHandling = NullValueHandling.Ignore,
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        };

        // GET: api/tbUsers
        [HttpGet]
        public string GetUsers()
        {
           var users =  db.Users as IQueryable<User>;
            foreach (var student in students)
            {
                student.Course = db.Courses.Find(student.CourseId);
            }
            return JsonConvert.SerializeObject(users, _serializerSettings);
        }

        [ResponseType(typeof(User))]
        public string loginUser(string username, string password)
        {
            User User = db.Users.FirstOrDefault(u => u.Username == username && u.Password == password);

            if (User == null)
            {
                return null;
            }

            return JsonConvert.SerializeObject(User, _serializerSettings);
        }
        // GET: api/tbUsers/5
        [HttpGet]
        public string GetUser(string username)
        {
            User User = db.Users.FirstOrDefault(u => u.Username == username);
            if (User == null)
            {
                return null;
            }

            return JsonConvert.SerializeObject(User, _serializerSettings);
        }

        // PUT: api/tbUsers/5
        [HttpPut]
        public bool EditUser([FromBody]User User)
        {
            db.Entry(User).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }            
        }

        // POST: api/tbUsers
        [HttpPost]
        public bool CreateUser([FromBody]User User)
        {
            try
            {
                db.Users.Add(User);
                db.SaveChanges();
                return true;
            }
            catch (Exception ex) {
                return false;
            }
        }

        // DELETE: api/tbUsers/5
        [HttpDelete]
        public bool DeleteUser(int id)
        {
            User User = db.Users.Find(id);
            if (User == null)
            {
                return false;
            }

            db.Users.Remove(User);
            db.SaveChanges();

            return true;
        }

        // GET: api/Students
        public string GetStudents()
        {
            var students = db.Users.Where(u => u.UserType == "student") as IQueryable<User>;
            foreach (var student in students)
            {
                student.Course = db.Courses.Find(student.CourseId);
            }
            return JsonConvert.SerializeObject(students, _serializerSettings);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        public bool tbUserExists(string username)
        {
            User user = db.Users.FirstOrDefault(e => e.Username == username);
            if (user.Equals(null))
                return false;
            return true;
        }
    }
}