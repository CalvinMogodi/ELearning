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
    public class SubjectController : ApiController
    {
        private ElearningContext db = new ElearningContext();

        private readonly JsonSerializerSettings _serializerSettings = new JsonSerializerSettings
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
            NullValueHandling = NullValueHandling.Ignore,
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        };

        // GET: api/Subject
        [HttpGet]
        public string Get()
        {
            var subjects = db.Subjects as IQueryable<Subject>;
            return JsonConvert.SerializeObject(subjects, _serializerSettings);
        }

        // GET: api/Subject/5
        public string GetSubjectsByCourseId(int courseId)
        {
            var subjects = db.Subjects.Where(s => s.CourseId == courseId) as IQueryable<Subject>;
            return JsonConvert.SerializeObject(subjects, _serializerSettings);
        }

        // POST: api/Subject
        [HttpPost]
        public bool Create(Subject subject)
        {
            try
            {
                db.Subjects.Add(subject);
                db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        // PUT: api/Subject/5
        [HttpPut]
        public bool Edit([FromBody]Subject subject)
        {
            db.Entry(subject).State = EntityState.Modified;

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

        // DELETE: api/Subject/5
        [HttpDelete]
        public bool Delete(int id)
        {
            Subject subject = db.Subjects.Find(id);
            if (subject == null)
            {
                return false;
            }

            db.Subjects.Remove(subject);
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
