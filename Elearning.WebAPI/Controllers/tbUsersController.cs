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
        public IHttpActionResult GettbUser(int id)
        {
            tbUser tbUser = db.tbUsers.Find(id);
            if (tbUser == null)
            {
                return NotFound();
            }

            return Ok(tbUser);
        }

        // PUT: api/tbUsers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttbUser(int id, tbUser tbUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tbUser.Id)
            {
                return BadRequest();
            }

            db.Entry(tbUser).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tbUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/tbUsers
        [ResponseType(typeof(tbUser))]
        public IHttpActionResult PosttbUser(tbUser tbUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tbUsers.Add(tbUser);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tbUser.Id }, tbUser);
        }

        // DELETE: api/tbUsers/5
        [ResponseType(typeof(tbUser))]
        public IHttpActionResult DeletetbUser(int id)
        {
            tbUser tbUser = db.tbUsers.Find(id);
            if (tbUser == null)
            {
                return NotFound();
            }

            db.tbUsers.Remove(tbUser);
            db.SaveChanges();

            return Ok(tbUser);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tbUserExists(int id)
        {
            return db.tbUsers.Count(e => e.Id == id) > 0;
        }
    }
}