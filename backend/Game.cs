// // Created by Kateřina Plívová on 31.03.2025.

namespace WordGames;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Models;
using Data;

public class Game(MySQLDatabase mysqlDb, Neo4jDatabase neo4jDb)
{
    public async Task Start()
    {
        try
        {
            // 🎲 Fetch a random letter set from MySQL
            var letterSet = mysqlDb.GetRandomLetterSet();
            var letters = letterSet.GetLetters();
            var centralLetter = letterSet.GetCentralLetter();

            // 🔍 Fetch valid words from Neo4j
            var validWords = (await neo4jDb.FindWordsForSet(letters, centralLetter))
                .Select(w => w.GetText())
                .ToList();


            // 🎮 Start the game loop
            PlayGame(letterSet, centralLetter, validWords);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"⚠️ Error: {ex.Message}");
        }
    }

    private void PlayGame(LetterSet letterSet, char centralLetter, ICollection<string> validWords)
    {
        HashSet<string> foundWords = [];
        var running = true;

        Console.WriteLine($"\n🎮 Game Started!");
        Console.WriteLine($"> Available letters: {string.Join(", ", letterSet.GetLetters())}");
        Console.WriteLine($"> Central letter: {centralLetter}");
        Console.WriteLine($"(Type 'exit' to quit)\n");

        while (running)
        {
            Console.Write("> Enter a word: ");
            var input = Console.ReadLine()?.Trim().ToLower();

            if (string.IsNullOrWhiteSpace(input))
            {
                Console.WriteLine("⚠️ Please enter a valid word.");
                continue;
            }

            if (input == "exit")
            {
                running = false;
                break;
            }

            if (IsValidWord(input, letterSet.GetLetters(), letterSet.GetCentralLetter(), validWords))
            {
                if (foundWords.Add(input))
                {
                    Console.WriteLine(IsPangram(input, letterSet.GetLetters()) ? "🌟 PANGRAM!" : "✅ Valid word!");
                }
                else
                {
                    Console.WriteLine("⚠️ You already found this word!");
                }
            }
            else
            {
                Console.WriteLine("❌ Invalid word! Try again.");
            }
        }

        Console.WriteLine($"\n🎉 Game over! You found {foundWords.Count} words.");
    }

    /// <summary>
    /// Checks if a word is valid based on the letter set, central letter, and dictionary.
    /// </summary>
    private static bool IsValidWord(string word, string letters, char centralLetter, ICollection<string> validWords)
    {
        return word.Length >= 4 && word.Contains(centralLetter) && word.All(letters.Contains) &&
               validWords.Contains(word);
    }

    /// <summary>
    /// Checks if a word is a pangram (contains all given letters at least once).
    /// </summary>
    private static bool IsPangram(string word, string letters)
    {
        return letters.All(word.Contains);
    }
}

