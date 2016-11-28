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
    public class AnnoucementController : ApiController
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
        public string GetAnnoucements()
        {

            var annoucements = db.Annoucements as IQueryable<Annoucement>;
            return JsonConvert.SerializeObject(annoucements, _serializerSettings);
        }

        // GET: 
        [HttpGet]
        public string GetAnnoucementsBySubjectId(int subjectId)
        {
            var annoucements = db.Annoucements.Where(a => a.SubjectId == subjectId) as IQueryable<Annoucement>;
            return JsonConvert.SerializeObject(annoucements, _serializerSettings);
        }

        // GET: /Details/
        [HttpPut]
        public bool Edit(Annoucement annoucement)
        {
            db.Entry(annoucement).State = EntityState.Modified;

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
        public bool Create(Annoucement annoucement)
        {
            try
            {

                db.Annoucements.Add(annoucement);
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
            Annoucement annoucement = db.Annoucements.Find(id);
            if (annoucement == null)
            {
                return false;
            }

            db.Annoucements.Remove(annoucement);
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
