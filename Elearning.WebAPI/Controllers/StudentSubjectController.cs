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
    public class StudentSubjectController : ApiController
    {
        private ElearningContext db = new ElearningContext();

        private readonly JsonSerializerSettings _serializerSettings = new JsonSerializerSettings
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
            NullValueHandling = NullValueHandling.Ignore,
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        };
        // GET: api/StudentSubject
        [HttpGet]
        public string Get()
        {
            var studentSubjects = db.StudentSubjects as IQueryable<StudentSubject>;
            return JsonConvert.SerializeObject(studentSubjects, _serializerSettings);
        }

        // GET: api/StudentSubject/5
        [HttpGet]
        public string GetByStudentId(int studentId)
        {
            var studentSubjects = db.StudentSubjects.Where(ss => ss.StudentId == studentId) as IQueryable<StudentSubject>;
            return JsonConvert.SerializeObject(studentSubjects, _serializerSettings);
        }

        // POST: api/StudentSubject
        [HttpPost]
        public bool Create([FromBody]StudentSubject studentSubject)
        {
            try
            {
                db.StudentSubjects.Add(studentSubject);
                db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        // PUT: api/StudentSubject/5
        [HttpPut]
        public bool Edit([FromBody]StudentSubject studentSubject)
        {
            db.Entry(studentSubject).State = EntityState.Modified;

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

        // DELETE: api/StudentSubject/5
        [HttpDelete]
        public bool Delete(int id)
        {
            StudentSubject studentSubject = db.StudentSubjects.Find(id);
            if (studentSubject == null)
            {
                return false;
            }

            db.StudentSubjects.Remove(studentSubject);
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
