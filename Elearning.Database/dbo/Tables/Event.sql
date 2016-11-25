CREATE TABLE [dbo].[Event] (
    [Id]          INT          IDENTITY (1, 1) NOT NULL,
    [Title]       VARCHAR (50) NOT NULL,
    [ClassId]     INT          NOT NULL,
    [StartDate]   DATETIME     NOT NULL,
    [EndDate]     DATETIME     NOT NULL,
    [Description] VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Event] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Event_Class] FOREIGN KEY ([ClassId]) REFERENCES [dbo].[Class] ([Id])
);

