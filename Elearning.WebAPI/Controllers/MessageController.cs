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
    public class MessageController : ApiController
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
        public string GetMessagesByUserId(int userId)
        {

            var massages = db.Messages.Where(m => m.UserId == userId) as IQueryable<Message>;
            return JsonConvert.SerializeObject(massages, _serializerSettings);
        }

        // GET: 
        [HttpGet]
        public string GetSentMessages(int senderId)
        {
            var massages = db.Messages.Where(m => m.SenderId == senderId) as IQueryable<Message>;
            return JsonConvert.SerializeObject(massages, _serializerSettings);
        }

        // GET: /Details/
        [HttpPut]
        public bool Edit(Message message)
        {
            db.Entry(message).State = EntityState.Modified;

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
        public bool Create(Message message)
        {
            try
            {

                db.Messages.Add(message);
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
