// using backend.Domain;
// using Microsoft.AspNetCore.Mvc;
// using WordGames.Data;

namespace backend.API.Controllers;
//
// [ApiController]
// [Route("api/[controller]")]
// public class SpellingBeeController(MySQLDatabase mysql, Neo4jDatabase neo4j) : ControllerBase
// {
//     [HttpGet("random-letter-set")]
//     public ActionResult<LetterSet> GetRandomLetterSet()
//     {
//         try
//         {
//             var set = mysql.GetRandomLetterSet();
//             return Ok(set);
//         }
//         catch (Exception ex)
//         {
//             return StatusCode(500, ex.Message);
//         }
//     }
//
//     [HttpGet("words")]
//     public async Task<ActionResult<List<Word>>> GetWordsForSet([FromQuery] string letters, [FromQuery] char central)
//     {
//         try
//         {
//             var words = await neo4j.FindWordsForSet(letters, central);
//             return Ok(words);
//         }
//         catch (Exception ex)
//         {
//             return StatusCode(500, ex.Message);
//         }
//     }
// }

using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.LetterSets.Queries;

[ApiController]
[Route("api/[controller]")]
public class LetterSetsController : ControllerBase
{
    private readonly IMediator _mediator;

    public LetterSetsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("random-letter-set")]
    public async Task<ActionResult<LetterSetDto>> GetRandomSet()
    {
        var letterSet = await _mediator.Send(new GetRandomLetterSetQuery());
        return Ok(letterSet);
    }
}