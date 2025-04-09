// // Created by Kateřina Plívová on 31.03.2025.

namespace WordGames.Data;

using System.Threading.Tasks;
using Neo4j.Driver;
using Models;

public class Neo4jDatabase(string uri, string user, string password) : IDisposable
{
    private readonly IDriver _driver = GraphDatabase.Driver(uri, AuthTokens.Basic(user, password));

    public async Task<List<Word>> FindWordsForSet(string letters, char centralLetter)
    {
        var words = new List<Word>();
        var session = _driver.AsyncSession();

        try
        {
            var letterList = letters.Select(c => c.ToString()).ToList();
            var parameters = new Dictionary<string, object>
            {
                { "letters", letterList },
                { "centralLetter", centralLetter.ToString() }
            };
            
            const string query = """
                                 
                                             MATCH (w:Word)
                                             WHERE all(letter IN split(w.text, '') WHERE letter IN $letters)
                                                 AND $centralLetter IN split(w.text, '')
                                                 AND size(w.text) >= 4
                                             RETURN w.text AS text, w.partOfSpeech AS partOfSpeech
                                 """;
            
            var result = await session.RunAsync(query, parameters);
            
            
            // TODO: RECORD IS NULL
            await foreach (var record in result)
            {
                words.Add(new Word(0, record["text"].As<string>(), record["partOfSpeech"].As<string>()));
            }

            Console.WriteLine($"✅ Found {words.Count} words.");
        }
        finally
        {
            await session.CloseAsync();
        }

        return words;
    }
    

    public async Task Close() => await _driver.CloseAsync();
    public void Dispose() => _driver.Dispose();
}