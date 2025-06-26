using backend.Application.Words.Queries;
using MediatR;
using Neo4j.Driver;

public class GetWordsQuery : IRequest<List<WordDto>>
{
    public string Letters { get; }
    public char CentralLetter { get; }

    public GetWordsQuery(string letters, char centralLetter)
    {
        Letters = letters;
        CentralLetter = centralLetter;
    }
}

public class GetWordsQueryHandler : IRequestHandler<GetWordsQuery, List<WordDto>>
{
    private readonly IDriver _neo4jDriver;

    public GetWordsQueryHandler(IDriver neo4jDriver)
    {
        _neo4jDriver = neo4jDriver;
    }

    public async Task<List<WordDto>> Handle(GetWordsQuery request, CancellationToken cancellationToken)
    {
        var session = _neo4jDriver.AsyncSession();

        try
        {
            var words = new List<WordDto>();

            const string cypher = @"
                MATCH (w:Word)
                WHERE ALL(c IN SPLIT(w.text, '') WHERE c IN $letters)
                  AND $centralLetter IN SPLIT(w.text, '')
                  AND size(w.text) >= 4
                RETURN w.id AS id, w.text AS text, w.pos AS partOfSpeech
            ";

            var result = await session.RunAsync(cypher, new
            {
                letters = request.Letters.ToCharArray().Distinct().Select(c => c.ToString()).ToList(),
                centralLetter = request.CentralLetter.ToString()
            });

            await result.ForEachAsync(record =>
            {
                words.Add(new WordDto
                {
                    Id = record["id"].As<string>(),
                    Text = record["text"].As<string>(),
                    PartOfSpeech = record["partOfSpeech"]?.As<string>() ?? ""
                });
            });

            return words;
        }
        finally
        {
            await session.CloseAsync();
        }
    }
}
