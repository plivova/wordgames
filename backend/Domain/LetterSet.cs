// // Created by Kateřina Plívová on 31.03.2025.

namespace backend.Domain;

/// <summary>
/// Used when fetching a letter set from MySQL.
/// </summary>
public class LetterSet
{
    public int Id { get; set; }
    public string Letters { get; set; } = "";
    public char CentralLetter { get; set; }
}