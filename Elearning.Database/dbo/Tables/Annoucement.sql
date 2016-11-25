CREATE TABLE [dbo].[Annoucement] (
    [Id]          INT          IDENTITY (1, 1) NOT NULL,
    [Title]       VARCHAR (50) NOT NULL,
    [SubjectId]   INT          NOT NULL,
    [Date]        DATETIME     NOT NULL,
    [Description] VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Annoucement] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Annoucement_Subject] FOREIGN KEY ([SubjectId]) REFERENCES [dbo].[Subject] ([Id])
);

