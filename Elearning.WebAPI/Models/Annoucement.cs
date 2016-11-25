namespace Elearning.WebAPI.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Annoucement")]
    public partial class Annoucement
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Title { get; set; }

        public int SubjectId { get; set; }

        public DateTime Date { get; set; }

        [Required]
        [StringLength(50)]
        public string Description { get; set; }

        public virtual Subject Subject { get; set; }
    }
}
