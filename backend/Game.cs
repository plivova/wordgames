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
        var points = 0;
        var running = true;

        Console.WriteLine($"\n🎮 Game Started!");
        Console.WriteLine($"> Available letters: {string.Join(", ", letterSet.GetLetters())}");
        Console.WriteLine($"> Central letter: {centralLetter}");
        Console.WriteLine("(Type 'exit' to quit)\n");

        while (running)
        {
            Console.Write("> Enter a word: ");
            var input = Console.ReadLine()?.Trim().ToLower();

            if (string.IsNullOrWhiteSpace(input))
            {
                Console.WriteLine("⚠️ Please enter a valid word.");
                continue;
            }

            if (IsValidWord(input, letterSet.GetLetters(), letterSet.GetCentralLetter(), validWords))
            {
                var isPangram = IsPangram(input, letterSet.GetLetters());
                if (foundWords.Add(input))
                {
                    Console.WriteLine(isPangram ? "🌟 PANGRAM!" : "✅ Valid word!");
                    
                    // Four-letter words score one point.
                    // Longer words score as many points as they have letters (a six-letter word is worth six points).
                    // Pangrams score the value of the word, plus seven points
                    if (input.Length == 4)
                    {
                        points += 1;
                    }
                    else
                    {
                        if (isPangram)
                        {
                            points += 7;
                        }
                        points += input.Length;
                    }
                    Console.WriteLine("Points: " + points);
                }
                else
                {
                    Console.WriteLine("⚠️ You already found this word!");
                }
            }
            else
            {
                if (input == "exit")
                {
                    running = false;
                }
                else
                { 
                    Console.WriteLine("❌ Invalid word! Try again.");
                }
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

