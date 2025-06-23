// // Created by Kateřina Plívová on 23.06.2025.

namespace backend.Application.LetterSets.Queries;

public class LetterSetDto
{
    public int Id { get; set; }
    public string Letters { get; set; } = "";
    public char CentralLetter { get; set; }
}