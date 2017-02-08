CREATE TABLE [dbo].[UploadedAssignment] (
    [Id]           INT           IDENTITY (1, 1) NOT NULL,
    [AssignmentId] INT           NOT NULL,
    [StudentId]    INT           NOT NULL,
    [File]         VARCHAR (MAX) NOT NULL,
    CONSTRAINT [PK_UploadedAssignment] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_UploadedAssignment_Assignment] FOREIGN KEY ([AssignmentId]) REFERENCES [dbo].[Assignment] ([Id]),
    CONSTRAINT [FK_UploadedAssignment_User] FOREIGN KEY ([StudentId]) REFERENCES [dbo].[User] ([Id])
);



