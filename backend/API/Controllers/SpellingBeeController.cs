// using backend.Domain;
// using Microsoft.AspNetCore.Mvc;
// using WordGames.Data;

namespace backend.API.Controllers;

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

using Application.Words.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.LetterSets.Queries;

[ApiController]
[Route("api/[controller]")]
public class SpellingBeeController(IMediator mediator) : ControllerBase
{
    [HttpGet("random-letter-set")]
    public async Task<ActionResult<LetterSetDto>> GetRandomSet()
    {
        var letterSet = await mediator.Send(new GetRandomLetterSetQuery());
        return Ok(letterSet);
    }
    
    [HttpGet("{letters}/{centralLetter}")]
    public async Task<ActionResult<List<WordDto>>> GetWords(string letters, char centralLetter)
    {
        var result = await mediator.Send(new GetWordsQuery(letters, centralLetter));
        return Ok(result);
    }
}