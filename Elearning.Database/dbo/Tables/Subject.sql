CREATE TABLE [dbo].[Subject] (
    [Id]          INT          IDENTITY (1, 1) NOT NULL,
    [Code]        VARCHAR (50) NOT NULL,
    [Title]       VARCHAR (50) NOT NULL,
    [Description] VARCHAR (50) NOT NULL,
    [CourseId]    INT          NOT NULL,
    CONSTRAINT [PK_Subject] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Subject_Course] FOREIGN KEY ([CourseId]) REFERENCES [dbo].[Course] ([Id])
);

