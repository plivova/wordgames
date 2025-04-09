// Created by Kateřina Plívová on 28.07.2024.

namespace WordGames;

using Data;
using System.Threading.Tasks;

public class Program
{
    public static async Task Main()
    {
        var mysqlDb = new MySQLDatabase("server=localhost;user=root;password=password;database=word_games;");
        var neo4jDb = new Neo4jDatabase("bolt://localhost:7687", "neo4j", "password");
        var game = new Game(mysqlDb, neo4jDb);
        await game.Start();

        await neo4jDb.Close();
    }
}
