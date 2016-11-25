CREATE TABLE [dbo].[StudentSubject] (
    [Id]        INT IDENTITY (1, 1) NOT NULL,
    [StudentId] INT NOT NULL,
    [SubjectId] INT NOT NULL,
    CONSTRAINT [PK_StudentSubject] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_StudentSubject_Subject] FOREIGN KEY ([SubjectId]) REFERENCES [dbo].[Subject] ([Id]),
    CONSTRAINT [FK_StudentSubject_User] FOREIGN KEY ([StudentId]) REFERENCES [dbo].[User] ([Id])
);

