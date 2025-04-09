// // Created by Kateřina Plívová on 16.02.2025.

namespace WordGames;

/// <summary>
/// Class <c>Trie</c> (prefix tree) represents a data structure for efficient storage and retrieval of words.
/// </summary>
public class Trie
{
    private readonly TrieNode _root = new();

    public TrieNode GetRoot()
    {
        return _root;
    }

    /// <summary>
    /// Method <c>Insert</c> inserts a word into the <c>Trie</c>.
    /// </summary>
    /// <param name="word">The word to insert into the <c>Trie</c>.</param>
    /// <example>root -> a -> p -> p (End of "app") -> l -> e (End of "apple")</example>
    public void Insert(string word)
    {
        var node = _root;
        foreach (var c in word)
        {
            // If the current character is not already a child node, add a new TrieNode for it
            if (!node.Children.TryGetValue(c, out var value))
            {
                value = new TrieNode();
                node.Children[c] = value;
            }
            // Move to the next node in the Trie
            node = value;
        }
        // Mark the last node as the end of a word
        node.IsEndOfWord = true;
    }

    /// <summary>
    /// Method <c>Search</c> searches for a word in the <c>Trie</c>.
    /// </summary>
    /// <param name="word">The word to search for.</param>
    /// <returns>True if the word is found, otherwise false.</returns> 
    public bool Search(string word)
    {
        var node = _root;
        foreach (var c in word) // Iterate through each character in the word
        {
            // If the character is not found in the current node's children, the word does not exist
            if (!node.Children.TryGetValue(c, out var value))
            {
                return false;
            }
            // Move to the next node in the Trie
            node = value;
        }
        // Return true only if the last node marks the end of a word
        return node.IsEndOfWord;
    }

    /// <summary>
    /// Method <c>CollectWords</c> collects all words stored in the <c>Trie</c>.
    /// </summary>
    /// <param name="callback">A function that processes each word found in the <c>Trie</c>.</param>
    public void CollectWords(Action<string> callback)
    {
        CollectWordsHelper(_root, "", callback);
    }

    /// <summary>
    /// Recursive helper method <c>CollectWordsHelper</c> collects all words stored in the Trie.
    /// </summary>
    /// <param name="node">The current TrieNode being processed.</param>
    /// <param name="currentWord">The word formed so far in traversal.</param>
    /// <param name="callback">A function that processes each word found in the Trie.</param>
    private static void CollectWordsHelper(TrieNode node, string currentWord, Action<string> callback)
    {
        if (node.IsEndOfWord)
        {
            callback(currentWord);
        }

        // Recursively visit all child nodes, adding their character to the current word
        foreach (var kvp in node.Children)
        {
            CollectWordsHelper(kvp.Value, currentWord + kvp.Key, callback);
        }
    }
}


