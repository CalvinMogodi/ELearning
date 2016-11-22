using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Elearning.WebAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public int Firstname { get; set; }
        public int Password { get; set; }
        public int StudentNumber { get; set; }
        public int Surname { get; set; }
        public int UserType { get; set; }
        public int Username { get; set; }
    }
}