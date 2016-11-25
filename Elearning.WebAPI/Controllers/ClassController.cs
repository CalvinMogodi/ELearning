using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Elearning.WebAPI.Models;

namespace Elearning.WebAPI.Controllers
{
    public class ClassController : ApiController
    {
        private ElearningContext db = new ElearningContext();

        private readonly JsonSerializerSettings _serializerSettings = new JsonSerializerSettings
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
            NullValueHandling = NullValueHandling.Ignore,
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        };

        // GET: 
        [HttpGet]
        public string GetClasses()
        {

            var classes = db.Classes as IQueryable<Class>;
            return JsonConvert.SerializeObject(classes, _serializerSettings);
        }

        // GET: /Details/
        [HttpPut]
        public bool Edit(Class classObj)
        {
            db.Entry(classObj).State = EntityState.Modified;

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

        // GET: /Create
        [HttpPost]
        public bool Create(Class classObj)
        {
            try
            {

                db.Classes.Add(classObj);
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
            Class classObj = db.Classes.Find(id);
            if (classObj == null)
            {
                return false;
            }

            db.Classes.Remove(classObj);
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
