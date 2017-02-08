CREATE TABLE [dbo].[Quiz] (
    [Id]          INT          IDENTITY (1, 1) NOT NULL,
    [Title]       VARCHAR (50) NOT NULL,
    [Description] VARCHAR (50) NOT NULL,
    [SubjectId]   INT          NOT NULL,
    CONSTRAINT [PK_Quiz] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Quiz_Subject] FOREIGN KEY ([SubjectId]) REFERENCES [dbo].[Subject] ([Id])
);

