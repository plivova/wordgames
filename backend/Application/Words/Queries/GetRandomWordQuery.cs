using MediatR;
using Neo4j.Driver;

namespace backend.Application.Words.Queries;

public class GetRandomWordQuery : IRequest<WordDto>
{
    public int WordLength { get; }

    public GetRandomWordQuery(int wordLength)
    {
        WordLength = wordLength;
    }
}

public class GetRandomWordQueryHandler(IDriver neo4jDriver) : IRequestHandler<GetRandomWordQuery, WordDto>
{
    public async Task<WordDto> Handle(GetRandomWordQuery request, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();
        await using var session = neo4jDriver.AsyncSession();

        var countResult = await session.RunAsync(
            "MATCH (w:Word) WHERE size(w.text) = $len RETURN count(w) AS cnt",
            new { len = request.WordLength });
        var countRecord = await countResult.SingleAsync();
        var totalWords = countRecord["cnt"].As<long>();

        if (totalWords == 0)
            throw new InvalidOperationException("No words found for the given length.");

        var offset = Random.Shared.NextInt64(totalWords);

        var cypher = @"
            MATCH (w:Word)
            WHERE size(w.text) = $len
            RETURN w.id AS id, w.text AS text, w.pos AS partOfSpeech
            ORDER BY w.id
            SKIP $offset
            LIMIT 1
        ";

        var result = await session.RunAsync(cypher, new { len = request.WordLength, offset });
        var records = await result.ToListAsync(cancellationToken: cancellationToken);

        if (records.Count == 0)
            throw new InvalidOperationException("No word found at the computed offset.");

        return WordDto.FromRecord(records[0]);
    }
}
