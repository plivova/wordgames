// // // Created by Kateřina Plívová on 31.03.2025.
//
// using backend.Domain;
//
// namespace WordGames.Data;
//
// using MySql.Data.MySqlClient;
//
// public class MySQLDatabase
// {
//     private readonly string _connectionString;
//
//     public MySQLDatabase(string connectionString)
//     {
//         _connectionString = connectionString;
//     }
//
//     public LetterSet GetRandomLetterSet()
//     {
//         using var conn = new MySqlConnection(_connectionString);
//         conn.Open();
//
//         var cmd = new MySqlCommand("SELECT id, letter_set, central_letter FROM letter_sets ORDER BY RAND() LIMIT 1;", conn);
//         using var reader = cmd.ExecuteReader();
//
//         if (!reader.Read()) throw new Exception("No letter sets found in database.");
//         var id = reader.GetInt32("id");
//         var letters = reader.GetString("letter_set");
//         var centralLetter = reader.GetChar("central_letter");
//
//         return new LetterSet(id, letters, centralLetter);
//     }
// }