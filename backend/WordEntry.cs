// // Created by Kateřina Plívová on 17.02.2025. 

namespace WordGames;

using System.Text.Json.Serialization;

public class WordEntry
{
    [JsonPropertyName("lemma")]
    public string Lemma { get; set; } = "";
}