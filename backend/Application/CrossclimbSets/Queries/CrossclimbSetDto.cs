namespace backend.Application.CrossclimbSets.Queries;

public class CrossclimbSetDto
{
    public int Id { get; set; }
    public int WordLength { get; set; }
    public int LadderSize { get; set; }
    public string Word1 { get; set; } = "";
    public string Word2 { get; set; } = "";
    public string Word3 { get; set; } = "";
    public string? Word4 { get; set; }
    public string? Word5 { get; set; }
    public string? Clue1 { get; set; }
    public string? Clue2 { get; set; }
    public string? Clue3 { get; set; }
    public string? Clue4 { get; set; }
    public string? Clue5 { get; set; }
}
