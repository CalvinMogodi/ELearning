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
            : base("name=ElearningContext")
        {
        }

        public virtual DbSet<Annoucement> Annoucements { get; set; }
        public virtual DbSet<Assignment> Assignments { get; set; }
        public virtual DbSet<Class> Classes { get; set; }
        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<Event> Events { get; set; }
        public virtual DbSet<Message> Messages { get; set; }
        public virtual DbSet<Quiz> Quizs { get; set; }
        public virtual DbSet<QuizAnswer> QuizAnswers { get; set; }
        public virtual DbSet<QuizQuestion> QuizQuestions { get; set; }
        public virtual DbSet<Resource> Resources { get; set; }
        public virtual DbSet<StudentSubject> StudentSubjects { get; set; }
        public virtual DbSet<Subject> Subjects { get; set; }
        public virtual DbSet<UploadedAssignment> UploadedAssignments { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Annoucement>()
                .Property(e => e.Title)
                .IsUnicode(false);

            modelBuilder.Entity<Annoucement>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<Assignment>()
                .Property(e => e.Title)
                .IsUnicode(false);

            modelBuilder.Entity<Assignment>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<Assignment>()
                .Property(e => e.File)
                .IsUnicode(false);

            modelBuilder.Entity<Class>()
                .Property(e => e.Title)
                .IsUnicode(false);

            modelBuilder.Entity<Class>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<Class>()
                .HasMany(e => e.Events)
                .WithRequired(e => e.Class)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Course>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<Course>()
                .Property(e => e.Title)
                .IsUnicode(false);

            modelBuilder.Entity<Course>()
                .HasMany(e => e.Subjects)
                .WithRequired(e => e.Course)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Event>()
                .Property(e => e.Title)
                .IsUnicode(false);

            modelBuilder.Entity<Event>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<Message>()
                .Property(e => e.SendTo)
                .IsUnicode(false);

            modelBuilder.Entity<Message>()
                .Property(e => e.Subject)
                .IsUnicode(false);

            modelBuilder.Entity<Message>()
                .Property(e => e.Message1)
                .IsUnicode(false);

            modelBuilder.Entity<Message>()
                .Property(e => e.Status)
                .IsUnicode(false);

            modelBuilder.Entity<Quiz>()
                .Property(e => e.Title)
                .IsUnicode(false);

            modelBuilder.Entity<Quiz>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<Quiz>()
                .HasMany(e => e.QuizAnswers)
                .WithRequired(e => e.Quiz)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Quiz>()
                .HasMany(e => e.QuizQuestions)
                .WithRequired(e => e.Quiz)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<QuizAnswer>()
                .Property(e => e.Score)
                .IsUnicode(false);

            modelBuilder.Entity<QuizQuestion>()
                .Property(e => e.Type)
                .IsUnicode(false);

            modelBuilder.Entity<QuizQuestion>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<QuizQuestion>()
                .Property(e => e.Answer)
                .IsUnicode(false);

            modelBuilder.Entity<Resource>()
                .Property(e => e.Title)
                .IsUnicode(false);

            modelBuilder.Entity<Resource>()
                .Property(e => e.File)
                .IsUnicode(false);

            modelBuilder.Entity<Subject>()
                .Property(e => e.Code)
                .IsUnicode(false);

            modelBuilder.Entity<Subject>()
                .Property(e => e.Title)
                .IsUnicode(false);

            modelBuilder.Entity<Subject>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<Subject>()
                .HasMany(e => e.Annoucements)
                .WithRequired(e => e.Subject)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Subject>()
                .HasMany(e => e.Assignments)
                .WithRequired(e => e.Subject)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Subject>()
                .HasMany(e => e.Quizs)
                .WithRequired(e => e.Subject)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Subject>()
                .HasMany(e => e.StudentSubjects)
                .WithRequired(e => e.Subject)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Subject>()
                .HasMany(e => e.UploadedAssignments)
                .WithRequired(e => e.Subject)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<UploadedAssignment>()
                .Property(e => e.File)
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

            modelBuilder.Entity<User>()
                .HasMany(e => e.Annoucements)
                .WithRequired(e => e.User)
                .HasForeignKey(e => e.LecturerId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.Assignments)
                .WithRequired(e => e.User)
                .HasForeignKey(e => e.LecturerId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.Messages)
                .WithRequired(e => e.User)
                .HasForeignKey(e => e.UserId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.Messages1)
                .WithRequired(e => e.User1)
                .HasForeignKey(e => e.SenderId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.QuizAnswers)
                .WithRequired(e => e.User)
                .HasForeignKey(e => e.StudentId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.StudentSubjects)
                .WithRequired(e => e.User)
                .HasForeignKey(e => e.StudentId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.UploadedAssignments)
                .WithRequired(e => e.User)
                .HasForeignKey(e => e.StudentId)
                .WillCascadeOnDelete(false);
        }
    }
}
