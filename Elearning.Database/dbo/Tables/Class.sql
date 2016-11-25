CREATE TABLE [dbo].[Class] (
    [Id]          INT          IDENTITY (1, 1) NOT NULL,
    [Title]       VARCHAR (50) NOT NULL,
    [Description] VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Class] PRIMARY KEY CLUSTERED ([Id] ASC)
);

