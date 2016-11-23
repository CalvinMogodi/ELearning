using Elearning.WebAPI.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
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
                return null;
        }

        // GET: Courses/Details/
        [HttpPut]
        public bool Edit(Course course)
        {
            try
            {
                return true;
            }
            catch (Exception)
            {
                return true;
            }
        }

        // GET: Courses/Create
        [HttpPost]
        public bool Create(Course course)
        {            
            try
            {
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
            try
            {
                return true;
            }
            catch (Exception)
            {
                return true;
            }
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
