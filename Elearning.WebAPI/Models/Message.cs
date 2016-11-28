namespace Elearning.WebAPI.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Message")]
    public partial class Message
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string SendTo { get; set; }

        public int UserId { get; set; }

        [Required]
        [StringLength(50)]
        public string Subject { get; set; }

        [Column("Message")]
        [Required]
        [StringLength(50)]
        public string Message1 { get; set; }

        public int SenderId { get; set; }

        [Required]
        [StringLength(50)]
        public string Status { get; set; }

        public DateTime CreatedDate { get; set; }

        public string File { get; set; }

        public virtual User User { get; set; }

        public virtual User User1 { get; set; }
    }
}
