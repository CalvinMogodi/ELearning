namespace Elearning.WebAPI
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using Models;

    public partial class ElearningContext : DbContext
    {
        public ElearningContext()
            : base("name=ElearningContext1")
        {
        }

        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Course>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<Course>()
                .Property(e => e.Title)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.Firstname)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.Password)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.Surname)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.UserType)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.Username)
                .IsUnicode(false);
        }
    }
}
