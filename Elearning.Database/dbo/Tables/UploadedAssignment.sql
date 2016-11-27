CREATE TABLE [dbo].[UploadedAssignment] (
    [Id]        INT           IDENTITY (1, 1) NOT NULL,
    [SubjectId] INT           NOT NULL,
    [StudentId] INT           NOT NULL,
    [File]      VARCHAR (MAX) NOT NULL,
    CONSTRAINT [PK_UploadedAssignment] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_UploadedAssignment_Subject] FOREIGN KEY ([SubjectId]) REFERENCES [dbo].[Subject] ([Id]),
    CONSTRAINT [FK_UploadedAssignment_User] FOREIGN KEY ([StudentId]) REFERENCES [dbo].[User] ([Id])
);

