CREATE TABLE [dbo].[User] (
    [Id]            INT          IDENTITY (1, 1) NOT NULL,
    [CourseId]      INT          NULL,
    [Firstname]     VARCHAR (50) NOT NULL,
    [Password]      VARCHAR (50) NOT NULL,
    [StudentNumber] INT          NULL,
    [Surname]       VARCHAR (50) NOT NULL,
    [UserType]      VARCHAR (50) NOT NULL,
    [Username]      VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_tbUser] PRIMARY KEY CLUSTERED ([Id] ASC)
);

