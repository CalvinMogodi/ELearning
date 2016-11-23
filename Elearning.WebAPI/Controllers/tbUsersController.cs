using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Elearning.WebAPI;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Elearning.WebAPI.Controllers
{
    public class tbUsersController : ApiController
    {
        private ElearningContext db = new ElearningContext();

        private readonly JsonSerializerSettings _serializerSettings = new JsonSerializerSettings {
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
            NullValueHandling = NullValueHandling.Ignore,
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        };

        // GET: api/tbUsers
        public string GettbUsers()
        {
           var users =  db.tbUsers as IQueryable<tbUser>;
            return JsonConvert.SerializeObject(users, _serializerSettings);
        }

        [ResponseType(typeof(tbUser))]
        public string loginUser(string username, string password)
        {
            tbUser tbUser = db.tbUsers.FirstOrDefault(u => u.Username == username && u.Password == password);

            if (tbUser == null)
            {
                return null;
            }

            return JsonConvert.SerializeObject(tbUser, _serializerSettings);
        }
        // GET: api/tbUsers/5
        [ResponseType(typeof(tbUser))]
        public string GettbUser(string username)
        {
            tbUser tbUser = db.tbUsers.FirstOrDefault(u => u.Username == username);
            if (tbUser == null)
            {
                return null;
            }

            return JsonConvert.SerializeObject(tbUser, _serializerSettings);
        }

        // PUT: api/tbUsers/5
        [HttpPut]
        public bool EditUser([FromBody]tbUser tbUser)
        {
            db.Entry(tbUser).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;
            }            
        }

        // POST: api/tbUsers
        [HttpPost]
        public bool CreateUser([FromBody]tbUser tbUser)
        {
            try
            {
                db.tbUsers.Add(tbUser);
                db.SaveChanges();
                return true;
            }
            catch (Exception ex) {
                return false;
            }
        }

        // DELETE: api/tbUsers/5
        [ResponseType(typeof(tbUser))]
        public bool DeletetbUser(int id)
        {
            tbUser tbUser = db.tbUsers.Find(id);
            if (tbUser == null)
            {
                return false;
            }

            db.tbUsers.Remove(tbUser);
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

        public bool tbUserExists(string username)
        {
            tbUser user = db.tbUsers.FirstOrDefault(e => e.Username == username);
            if (user.Equals(null))
                return false;
            return true;
        }
    }
}