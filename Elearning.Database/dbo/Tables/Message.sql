CREATE TABLE [dbo].[Message] (
    [Id]       INT          IDENTITY (1, 1) NOT NULL,
    [SendTo]   VARCHAR (50) NOT NULL,
    [UserId]   INT          NOT NULL,
    [Subject]  VARCHAR (50) NOT NULL,
    [Message]  VARCHAR (50) NOT NULL,
    [SenderId] INT          NOT NULL,
    [Status]   VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Message] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Message_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([Id]),
    CONSTRAINT [FK_Message_User1] FOREIGN KEY ([SenderId]) REFERENCES [dbo].[User] ([Id])
);

