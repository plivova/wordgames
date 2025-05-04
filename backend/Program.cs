// Created by Kateřina Plívová on 28.07.2024.

using WordGames.Data;

namespace WordGames;

using System.Threading.Tasks;

public class Program
{
    public static async Task Main()
    { 
        DotNetEnv.Env.Load("../../../../.env");
        
        var mysqlConn = Environment.GetEnvironmentVariable("MYSQL_CONNECTION");
        var neo4jUri = Environment.GetEnvironmentVariable("NEO4J_URI");
        var neo4jUser = Environment.GetEnvironmentVariable("NEO4J_USER");
        var neo4jPass = Environment.GetEnvironmentVariable("NEO4J_PASSWORD");
        
        var mysqlDb = new MySQLDatabase(mysqlConn);
        var neo4jDb = new Neo4jDatabase(neo4jUri, neo4jUser, neo4jPass);
        
        var game = new Game(mysqlDb, neo4jDb);
        await game.Start();
    
        await neo4jDb.Close();
    }
}
