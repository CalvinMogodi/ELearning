using Elearning.WebAPI.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Elearning.WebAPI.Controllers
{
    public class CoursesController : ApiController
    {
        private ElearningContext db = new ElearningContext();

        private readonly JsonSerializerSettings _serializerSettings = new JsonSerializerSettings
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
            NullValueHandling = NullValueHandling.Ignore,
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        };

        // GET: Courses
        [HttpGet]
        public string GetCourses()
        {

            var courses = db.Courses as IQueryable<Course>;
            return JsonConvert.SerializeObject(courses, _serializerSettings);
        }

        // GET: Courses/Details/
        [HttpPut]
        public bool Edit(Course course)
        {
            db.Entry(course).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return true;
            }
        }

        [HttpGet]
        public string GetCourse(int id)
        {
            Course course = db.Courses.Find(id);
            if (course == null)
            {
                return null;
            }

            return JsonConvert.SerializeObject(User, _serializerSettings);
        }

        // GET: Courses/Create
        [HttpPost]
        public bool Create(Course course)
        {            
            try
            {

                db.Courses.Add(course);
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return true;
            }
        }
             

        // GET: Courses/Delete/5
        [HttpDelete]
        public bool Delete(int id)
        {
            Course course = db.Courses.Find(id);
            if (course == null)
            {
                return false;
            }

            db.Courses.Remove(course);
            db.SaveChanges();

            return true;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
