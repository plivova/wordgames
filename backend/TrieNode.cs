// // Created by Kateřina Plívová on 16.02.2025.

namespace WordGames;

/// <summary>
/// Class <c>TrieNode</c> represents a node in the <c>Trie</c> data structure.
/// Each node contains a dictionary of child nodes and a flag indicating if it's the end of a word.
/// </summary> 
public class TrieNode
{
    public Dictionary<char, TrieNode> Children { get; } = new();
    public bool IsEndOfWord { get; set; }
}