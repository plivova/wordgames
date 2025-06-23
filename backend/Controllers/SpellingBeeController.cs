// // Created by Kateřina Plívová on 10.05.2025.

using WordGames.Data;

namespace WordGames.Controllers;

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class SpellingBeeController : ControllerBase
{
    private readonly MySQLDatabase _mysql;
    private readonly Neo4jDatabase _neo4j;
    
    public SpellingBeeController(MySQLDatabase mysql, Neo4jDatabase neo4j)
    {
        _mysql = mysql;
        _neo4j = neo4j;
    }
    
    [HttpGet("random-set")]
    public IActionResult GetRandomLetterSet()
    {
        var set = _mysql.GetRandomLetterSet();
        return Ok(set);
    }

    [HttpGet("words")]
    public async Task<IActionResult> GetWordsForSet([FromQuery] string letters, [FromQuery] char central)
    {
        var words = await _neo4j.FindWordsForSet(letters, central);
        return Ok(words);
    }
}