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
    public class AssignmentController : ApiController
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
        public string GetAssignments()
        {

            var assignments = db.Assignments as IQueryable<Assignment>;
            return JsonConvert.SerializeObject(assignments, _serializerSettings);
        }

        // GET: 
        [HttpGet]
        public string GetAssignmentsBySubjectId(int subjectId)
        {
            var assignments = db.Assignments.Where(a => a.SubjectId == subjectId) as IQueryable<Assignment>;
            return JsonConvert.SerializeObject(assignments, _serializerSettings);
        }

        // GET: /Details/
        [HttpPut]
        public bool Edit(Assignment assignment)
        {
            db.Entry(assignment).State = EntityState.Modified;

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
        public bool Create(Assignment assignment)
        {
            try
            {

                db.Assignments.Add(assignment);
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
            Assignment assignment = db.Assignments.Find(id);
            if (assignment == null)
            {
                return false;
            }

            db.Assignments.Remove(assignment);
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
