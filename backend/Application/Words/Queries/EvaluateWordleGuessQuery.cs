using MediatR;
using Neo4j.Driver;

namespace backend.Application.Words.Queries;

public class EvaluateWordleGuessQuery : IRequest<WordleEvaluationDto?>
{
    public string GameId { get; }
    public string Guess { get; }

    public EvaluateWordleGuessQuery(string gameId, string guess)
    {
        GameId = gameId;
        Guess = guess;
    }
}

public class WordleEvaluationDto
{
    public string[] Results { get; set; } = [];
    public bool IsCorrect { get; set; }
    public bool IsValidWord { get; set; }
    public string? TargetWord { get; set; } // Only revealed when game is over
}

public class EvaluateWordleGuessQueryHandler(IDriver neo4jDriver, WordleGameStore gameStore)
    : IRequestHandler<EvaluateWordleGuessQuery, WordleEvaluationDto?>
{
    public async Task<WordleEvaluationDto?> Handle(EvaluateWordleGuessQuery request, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        var target = gameStore.GetWord(request.GameId);
        if (target == null)
            return null;

        // Validate guess exists in dictionary
        await using var session = neo4jDriver.AsyncSession();
        var result = await session.RunAsync(
            "MATCH (w:Word) WHERE w.text = $word RETURN count(w) AS cnt",
            new { word = request.Guess.ToLower() });
        var record = await result.SingleAsync();
        var exists = record["cnt"].As<long>() > 0;

        if (!exists)
            return new WordleEvaluationDto { IsValidWord = false, Results = [], IsCorrect = false };

        var guess = request.Guess.ToLower().ToCharArray();
        var targetChars = target.ToLower().ToCharArray();
        var results = new string[guess.Length];
        var remaining = new char[targetChars.Length];
        Array.Copy(targetChars, remaining, targetChars.Length);

        // First pass: correct
        for (int i = 0; i < guess.Length; i++)
        {
            if (guess[i] == targetChars[i])
            {
                results[i] = "correct";
                remaining[i] = '\0';
            }
        }

        // Second pass: present
        for (int i = 0; i < guess.Length; i++)
        {
            if (results[i] == "correct") continue;
            var idx = Array.IndexOf(remaining, guess[i]);
            if (idx != -1)
            {
                results[i] = "present";
                remaining[idx] = '\0';
            }
            else
            {
                results[i] = "absent";
            }
        }

        var isCorrect = results.All(r => r == "correct");

        return new WordleEvaluationDto
        {
            IsValidWord = true,
            Results = results,
            IsCorrect = isCorrect,
        };
    }
}
