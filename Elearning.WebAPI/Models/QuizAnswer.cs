namespace Elearning.WebAPI.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("QuizAnswer")]
    public partial class QuizAnswer
    {
        public int Id { get; set; }

        public int StudentId { get; set; }

        [Required]
        [StringLength(50)]
        public string Score { get; set; }

        public int QuizId { get; set; }

        public virtual Quiz Quiz { get; set; }

        public virtual User User { get; set; }
    }
}
