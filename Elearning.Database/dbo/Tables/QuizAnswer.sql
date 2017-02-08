CREATE TABLE [dbo].[QuizAnswer] (
    [Id]        INT          IDENTITY (1, 1) NOT NULL,
    [StudentId] INT          NOT NULL,
    [Score]     VARCHAR (50) NOT NULL,
    [QuizId]    INT          NOT NULL,
    CONSTRAINT [PK_QuizAnswer] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_QuizAnswer_Quiz] FOREIGN KEY ([QuizId]) REFERENCES [dbo].[Quiz] ([Id]),
    CONSTRAINT [FK_QuizAnswer_User] FOREIGN KEY ([StudentId]) REFERENCES [dbo].[User] ([Id])
);

