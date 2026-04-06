namespace backend.API.Controllers;

using System.Text.RegularExpressions;
using Application.Words.Queries;
using Application.LetterBoxedSets.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public partial class LetterBoxedController(IMediator mediator) : ControllerBase
{
    [GeneratedRegex(@"^[a-záčďéěíňóřšťúůýž]{3}$")]
    private static partial Regex SidePattern();

    [HttpGet("random-letter-set")]
    public async Task<ActionResult<LetterBoxedSetDto>> GetRandomSet(CancellationToken cancellationToken)
    {
        var set = await mediator.Send(new GetRandomLetterBoxedSetQuery(), cancellationToken);
        return Ok(set);
    }

    [HttpGet("{side1}/{side2}/{side3}/{side4}")]
    public async Task<ActionResult<List<WordDto>>> GetWords(string side1, string side2, string side3, string side4, CancellationToken cancellationToken)
    {
        var sides = new[] { side1, side2, side3, side4 };
        foreach (var side in sides)
        {
            if (string.IsNullOrWhiteSpace(side) || !SidePattern().IsMatch(side))
                return BadRequest($"Invalid side parameter: '{side}'. Each side must be exactly 3 Czech letters.");
        }

        var allLetters = string.Concat(sides);
        if (allLetters.Distinct().Count() != 12)
            return BadRequest("All 12 letters must be unique.");

        var result = await mediator.Send(new GetLetterBoxedWordsQuery(side1, side2, side3, side4), cancellationToken);
        return Ok(result);
    }
}
