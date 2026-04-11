using System.Collections.Concurrent;

namespace backend.Application.Words.Queries;

public class WordleGameStore
{
    private readonly ConcurrentDictionary<string, GameSession> _games = new();

    public string CreateGame(string word, int maxGuesses)
    {
        var gameId = Guid.NewGuid().ToString("N");
        _games[gameId] = new GameSession
        {
            Word = word.ToLower(),
            MaxGuesses = maxGuesses,
            GuessCount = 0,
            CreatedAt = DateTime.UtcNow
        };
        CleanupOldGames();
        return gameId;
    }

    public string? GetWord(string gameId)
    {
        return _games.TryGetValue(gameId, out var session) ? session.Word : null;
    }

    public int IncrementGuess(string gameId)
    {
        if (_games.TryGetValue(gameId, out var session))
        {
            session.GuessCount++;
            return session.GuessCount;
        }
        return -1;
    }

    public bool IsGameOver(string gameId)
    {
        if (_games.TryGetValue(gameId, out var session))
            return session.GuessCount >= session.MaxGuesses;
        return true;
    }

    public string? EndGame(string gameId)
    {
        if (_games.TryRemove(gameId, out var session))
            return session.Word;
        return null;
    }

    private void CleanupOldGames()
    {
        var cutoff = DateTime.UtcNow.AddHours(-2);
        foreach (var kvp in _games)
        {
            if (kvp.Value.CreatedAt < cutoff)
                _games.TryRemove(kvp.Key, out _);
        }
    }

    private class GameSession
    {
        public string Word { get; set; } = "";
        public int MaxGuesses { get; set; }
        public int GuessCount { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
