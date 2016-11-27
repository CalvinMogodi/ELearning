using Elearning.WebAPI.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Elearning.WebAPI.Controllers
{
    public class QuizAnswerController : ApiController
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
        public string GetQuizAnsweres()
        {

            var classes = db.QuizAnswers as IQueryable<QuizAnswer>;
            return JsonConvert.SerializeObject(classes, _serializerSettings);
        }

        // GET: /Create
        [HttpPost]
        public bool Create(QuizAnswer quizQuestion)
        {
            try
            {

                db.QuizAnswers.Add(quizQuestion);
                db.SaveChanges();
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
