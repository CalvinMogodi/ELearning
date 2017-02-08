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
    public class EventController : ApiController
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
        public string GetEvents()
        {

            var events = db.Events as IQueryable<Event>;
            return JsonConvert.SerializeObject(events, _serializerSettings);
        }

        // GET: /Details/
        [HttpPut]
        public bool Edit(Event eventOjb)
        {
            db.Entry(eventOjb).State = EntityState.Modified;

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
        public bool Create(Event eventObj)
        {
            try
            {

                db.Events.Add(eventObj);
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
            Event eventObj = db.Events.Find(id);
            if (eventObj == null)
            {
                return false;
            }

            db.Events.Remove(eventObj);
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
