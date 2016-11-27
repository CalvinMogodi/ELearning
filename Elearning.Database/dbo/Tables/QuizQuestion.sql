CREATE TABLE [dbo].[QuizQuestion] (
    [Id]          INT           IDENTITY (1, 1) NOT NULL,
    [Type]        VARCHAR (50)  NOT NULL,
    [Description] VARCHAR (500) NOT NULL,
    [Answer]      VARCHAR (50)  NOT NULL,
    [QuizId]      INT           NOT NULL,
    CONSTRAINT [PK_QuizQuestion] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_QuizQuestion_Quiz] FOREIGN KEY ([QuizId]) REFERENCES [dbo].[Quiz] ([Id])
);

