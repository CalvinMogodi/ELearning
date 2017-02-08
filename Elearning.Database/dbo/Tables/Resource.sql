CREATE TABLE [dbo].[Resource] (
    [Id]    INT           IDENTITY (1, 1) NOT NULL,
    [Title] VARCHAR (50)  NOT NULL,
    [File]  VARCHAR (MAX) NOT NULL,
    CONSTRAINT [PK_Resource] PRIMARY KEY CLUSTERED ([Id] ASC)
);

