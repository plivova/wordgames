// // Created by Kateřina Plívová on 31.03.2025.

namespace WordGames.Data;

using System.Threading.Tasks;
using Neo4j.Driver;
using Models;

public class Neo4jDatabase(string uri, string user, string password) : IDisposable
{
     IDriver _driver = GraphDatabase.Driver(uri,
         AuthTokens.Basic(user, password));

     public async Task<List<Word>> FindWordsForSet(string letters, char centralLetter)
     {
         var words = new List<Word>();

         var letterList = letters.Select(c => c.ToString()).ToList();
         var parameters = new Dictionary<string, object>
         {
             { "letters", letterList },
             { "centralLetter", centralLetter.ToString() }
         };

         const string query = """
                                  MATCH (w:Word)
                                  WHERE all(letter IN split(toLower(w.text), '') WHERE letter IN $letters)
                                    AND $centralLetter IN split(toLower(w.text), '')
                                    AND size(w.text) >= 4
                                  RETURN w.text AS text, w.partOfSpeech AS partOfSpeech
                              """;

         await using var session = _driver.AsyncSession();

         try
         {
             var result = await session.ExecuteReadAsync(async tx =>
             {
                 var cursor = await tx.RunAsync(query, parameters);
                 return await cursor.ToListAsync();
             });

             words.AddRange(result.Select(record =>
                 new Word(0, record["text"].As<string>(), record["partOfSpeech"].As<string>())));

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