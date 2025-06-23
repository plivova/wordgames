// // Created by Kateřina Plívová on 31.03.2025.

namespace WordGames.Models;

/// <summary>
/// Used when fetching words from MySQL/Neo4j.
/// </summary>
public class Word
{
    public int Id { get; set; } // Unique identifier in database
    private string Text { get; set; } = "";
    private string PartOfSpeech { get; set; } = "";

    // Constructor
    public Word(int id, string text, string partOfSpeech)
    {
        Id = id;
        Text = text;
        PartOfSpeech = partOfSpeech;
    }

    // Getter methods
    public string GetText() => Text;
    public string GetPartOfSpeech() => PartOfSpeech;

    // Optional: Check if word is a noun, verb, etc.
    public bool IsPartOfSpeech(string pos) => PartOfSpeech.Equals(pos, StringComparison.OrdinalIgnoreCase);
}