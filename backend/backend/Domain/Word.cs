// // Created by Kateřina Plívová on 31.03.2025.

namespace backend.Domain;

/// <summary>
/// Used when fetching words from MySQL/Neo4j.
/// </summary>
public class Word
{
    public string Id { get; set; }
    public string Text { get; set; } = "";
    public string PartOfSpeech { get; set; } = "";
}