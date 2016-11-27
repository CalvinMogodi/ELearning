namespace Elearning.WebAPI.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("UploadedAssignment")]
    public partial class UploadedAssignment
    {
        public int Id { get; set; }

        public int SubjectId { get; set; }

        public int StudentId { get; set; }

        [Required]
        public string File { get; set; }

        public virtual Subject Subject { get; set; }

        public virtual User User { get; set; }
    }
}
