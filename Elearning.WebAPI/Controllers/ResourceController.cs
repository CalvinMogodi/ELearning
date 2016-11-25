using Elearning.WebAPI.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Elearning.WebAPI.Controllers
{
    public class ResourceController : ApiController
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
        public string GetResources()
        {

            var resources = db.Resources as IQueryable<Resource>;
            return JsonConvert.SerializeObject(resources, _serializerSettings);
        }

        // GET: /Details/
        [HttpPut]
        public bool Edit(Resource resource)
        {
            db.Entry(resource).State = EntityState.Modified;

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
        public bool Create(Resource resource)
        {
            try
            {
                db.Resources.Add(resource);
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return true;
            }
        }


        // GET: /Delete/5
        [HttpDelete]
        public bool Delete(int id)
        {
            Resource resource = db.Resources.Find(id);
            if (resource == null)
            {
                return false;
            }

            db.Resources.Remove(resource);
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
