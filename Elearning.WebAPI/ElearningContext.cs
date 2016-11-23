namespace Elearning.WebAPI
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class ElearningContext : DbContext
    {
        public ElearningContext()
            : base("name=ElearningContext")
        {
        }

        public virtual DbSet<tbUser> tbUsers { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<tbUser>()
                .Property(e => e.Firstname)
                .IsUnicode(false);

            modelBuilder.Entity<tbUser>()
                .Property(e => e.Password)
                .IsUnicode(false);

            modelBuilder.Entity<tbUser>()
                .Property(e => e.StudentNumber);

            modelBuilder.Entity<tbUser>()
                .Property(e => e.Surname)
                .IsUnicode(false);

            modelBuilder.Entity<tbUser>()
                .Property(e => e.UserType)
                .IsUnicode(false);

            modelBuilder.Entity<tbUser>()
                .Property(e => e.Username)
                .IsUnicode(false);
        }
    }
}
