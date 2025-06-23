// // Created by Kateřina Plívová on 31.03.2025.

namespace WordGames.Models;

/// <summary>
/// Used when fetching a letter set from MySQL.
/// </summary>
public class LetterSet
{
    public int Id { get; set; }

    private string Letters { get; set; } = "";
    private char CentralLetter { get; set; }

    // Constructor to initialize the object
    public LetterSet(int id, string letters, char centralLetter)
    {
        Id = id;
        Letters = letters;
        CentralLetter = centralLetter;
    }

    // Getter methods
    public string GetLetters() => Letters;
    public char GetCentralLetter() => CentralLetter;

}