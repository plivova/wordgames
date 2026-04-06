// // Created by Kateřina Plívová on 23.06.2025.

using Neo4j.Driver;

namespace backend.Application.Words.Queries;

public class WordDto
{
    public string Id { get; set; } = "";
    public string Text { get; set; } = "";
    public string PartOfSpeech { get; set; } = "";

    public static WordDto FromRecord(IRecord record) => new()
    {
        Id = record["id"].As<string>(),
        Text = record["text"].As<string>(),
        PartOfSpeech = record["partOfSpeech"]?.As<string>() ?? ""
    };
}