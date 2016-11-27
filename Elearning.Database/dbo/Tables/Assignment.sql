CREATE TABLE [dbo].[Assignment] (
    [Id]          INT           IDENTITY (1, 1) NOT NULL,
    [Title]       VARCHAR (50)  NOT NULL,
    [SubjectId]   INT           NOT NULL,
    [Date]        DATETIME      NOT NULL,
    [Description] VARCHAR (50)  NOT NULL,
    [File]        VARCHAR (MAX) NOT NULL,
    [LecturerId]  INT           NOT NULL,
    CONSTRAINT [PK_Assignment] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Assignment_Subject] FOREIGN KEY ([SubjectId]) REFERENCES [dbo].[Subject] ([Id]),
    CONSTRAINT [FK_Assignment_User] FOREIGN KEY ([LecturerId]) REFERENCES [dbo].[User] ([Id])
);



