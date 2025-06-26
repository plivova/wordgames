// // Created by Kateřina Plívová on 23.06.2025.

using MediatR;
using Neo4j.Driver;

namespace backend.Application.Words.Queries;

public class GetWordOfTheDayQuery : IRequest<WordDto>;

public class GetWordOfTheDayQueryHandler(IDriver neo4jDriver) : IRequestHandler<GetWordOfTheDayQuery, WordDto>
{
    public async Task<WordDto> Handle(GetWordOfTheDayQuery request, CancellationToken cancellationToken)
    {
        var session = neo4jDriver.AsyncSession();

        try
        {
            var cypher = @"
                MATCH (w:Word)
                WHERE size(w.text) >= 4
                WITH w, rand() AS r
                RETURN w.id AS id, w.text AS text, w.pos AS partOfSpeech
                ORDER BY r
                LIMIT 1
            ";

            var result = await session.RunAsync(cypher);
            var record = await result.SingleAsync();

            if (record == null) return null;

            return new WordDto
            {
                Id = record["id"].As<string>(),
                Text = record["text"].As<string>(),
                PartOfSpeech = record["partOfSpeech"]?.As<string>() ?? ""
            };
        }
        finally
        {
            await session.CloseAsync();
        }
    }
}