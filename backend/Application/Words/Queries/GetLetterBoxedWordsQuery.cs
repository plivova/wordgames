using MediatR;
using Neo4j.Driver;

namespace backend.Application.Words.Queries;

public class GetLetterBoxedWordsQuery : IRequest<List<WordDto>>
{
    public string Side1 { get; }
    public string Side2 { get; }
    public string Side3 { get; }
    public string Side4 { get; }

    public GetLetterBoxedWordsQuery(string side1, string side2, string side3, string side4)
    {
        Side1 = side1;
        Side2 = side2;
        Side3 = side3;
        Side4 = side4;
    }
}

public class GetLetterBoxedWordsQueryHandler : IRequestHandler<GetLetterBoxedWordsQuery, List<WordDto>>
{
    private readonly IDriver _neo4jDriver;

    public GetLetterBoxedWordsQueryHandler(IDriver neo4jDriver)
    {
        _neo4jDriver = neo4jDriver;
    }

    public async Task<List<WordDto>> Handle(GetLetterBoxedWordsQuery request, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        // Build side lookup: letter -> side index
        var sides = new[] { request.Side1, request.Side2, request.Side3, request.Side4 };
        var letterToSide = new Dictionary<char, int>();
        for (int s = 0; s < 4; s++)
        {
            foreach (var c in sides[s])
            {
                letterToSide[c] = s;
            }
        }

        var allLetters = sides.SelectMany(s => s.ToCharArray()).Distinct().Select(c => c.ToString()).ToList();

        // Query Neo4j: words using only these 12 letters, length >= 3
        await using var session = _neo4jDriver.AsyncSession();
        var candidates = new List<WordDto>();

        const string cypher = @"
            MATCH (w:Word)
            WHERE ALL(c IN SPLIT(w.text, '') WHERE c IN $letters)
              AND size(w.text) >= 3
            RETURN w.id AS id, w.text AS text, w.pos AS partOfSpeech
        ";

        var result = await session.RunAsync(cypher, new { letters = allLetters });

        await result.ForEachAsync(record => candidates.Add(WordDto.FromRecord(record)));

        // Filter: consecutive letters must be on different sides
        var validWords = new List<WordDto>();
        foreach (var word in candidates)
        {
            if (IsValidLetterBoxedWord(word.Text, letterToSide))
            {
                validWords.Add(word);
            }
        }

        return validWords;
    }

    private static bool IsValidLetterBoxedWord(string text, Dictionary<char, int> letterToSide)
    {
        for (int i = 1; i < text.Length; i++)
        {
            if (!letterToSide.TryGetValue(text[i - 1], out var prevSide) ||
                !letterToSide.TryGetValue(text[i], out var currSide))
            {
                return false;
            }

            if (prevSide == currSide)
                return false;
        }

        return true;
    }
}
