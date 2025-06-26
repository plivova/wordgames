// // Created by Kateřina Plívová on 23.06.2025.

using backend.Application.Words.Queries;
using Microsoft.AspNetCore.Mvc;
using MediatR;

namespace backend.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WordOfTheDayController(IMediator mediator) : ControllerBase
{
    [HttpGet("word")]
    public async Task<ActionResult<WordDto>> GetRandomWord()
    {
        var letterSet = await mediator.Send(new GetWordOfTheDayQuery());
        return Ok(letterSet);
    }
}