// // Created by Kateřina Plívová on 23.06.2025.

using System.Security.Cryptography;
using System.Text;
using MediatR;
using Neo4j.Driver;

namespace backend.Application.Words.Queries;

public class GetWordOfTheDayQuery : IRequest<WordDto>;

public class GetWordOfTheDayQueryHandler(IDriver neo4jDriver) : IRequestHandler<GetWordOfTheDayQuery, WordDto>
{
    public async Task<WordDto> Handle(GetWordOfTheDayQuery request, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();
        await using var session = neo4jDriver.AsyncSession();

        // Count eligible words
        var countResult = await session.RunAsync("MATCH (w:Word) WHERE size(w.text) >= 4 RETURN count(w) AS cnt");
        var countRecord = await countResult.SingleAsync();
        var totalWords = countRecord["cnt"].As<long>();

        if (totalWords == 0)
            throw new InvalidOperationException("No words found in the database.");

        // Derive a deterministic offset from today's date
        var dateString = DateTime.UtcNow.ToString("yyyy-MM-dd");
        var hash = SHA256.HashData(Encoding.UTF8.GetBytes(dateString));
        var offset = Math.Abs(BitConverter.ToInt64(hash, 0)) % totalWords;

        var cypher = @"
            MATCH (w:Word)
            WHERE size(w.text) >= 4
            RETURN w.id AS id, w.text AS text, w.pos AS partOfSpeech
            ORDER BY w.id
            SKIP $offset
            LIMIT 1
        ";

        var result = await session.RunAsync(cypher, new { offset });
        var records = await result.ToListAsync(cancellationToken: cancellationToken);

        if (records.Count == 0)
            throw new InvalidOperationException("No word found at the computed offset.");

        return WordDto.FromRecord(records[0]);
    }
}