namespace backend.API.Controllers;

using Application.CrossclimbSets.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class CrossclimbController(IMediator mediator) : ControllerBase
{
    [HttpGet("random-set")]
    public async Task<ActionResult<CrossclimbSetDto>> GetRandomSet(CancellationToken cancellationToken)
    {
        var set = await mediator.Send(new GetRandomCrossclimbSetQuery(), cancellationToken);
        return Ok(set);
    }
}
