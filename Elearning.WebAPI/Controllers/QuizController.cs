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
    public class QuizController : ApiController
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
        public string GetQuizes()
        {

            var quizzes = db.Quizs as IQueryable<Quiz>;
            return JsonConvert.SerializeObject(quizzes, _serializerSettings);
        }

        // GET: 
        [HttpGet]
        public string GetQuizesBySubjectId(int subjectId)
        {

            var quizzes = db.Quizs.Where(q => q.SubjectId == subjectId) as IQueryable<Quiz>;
            return JsonConvert.SerializeObject(quizzes, _serializerSettings);
        }

        // GET: /Details/
        [HttpPut]
        public bool Edit(Quiz quiz)
        {
            db.Entry(quiz).State = EntityState.Modified;

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
        public bool Create(Quiz quiz)
        {
            try
            {

                db.Quizs.Add(quiz);
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
            Quiz classObj = db.Quizs.Find(id);
            if (classObj == null)
            {
                return false;
            }

            db.Quizs.Remove(classObj);
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
