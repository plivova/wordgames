namespace backend.API.Controllers;

using System.Text.RegularExpressions;
using Application.Words.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.LetterSets.Queries;

[ApiController]
[Route("api/[controller]")]
public partial class SpellingBeeController(IMediator mediator) : ControllerBase
{
    [GeneratedRegex(@"^[a-zA-ZáčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]{2,12}$")]
    private static partial Regex LettersPattern();

    [HttpGet("random-letter-set")]
    public async Task<ActionResult<LetterSetDto>> GetRandomSet(CancellationToken cancellationToken)
    {
        var letterSet = await mediator.Send(new GetRandomLetterSetQuery(), cancellationToken);
        return Ok(letterSet);
    }

    [HttpGet("{letters}/{centralLetter}")]
    public async Task<ActionResult<List<WordDto>>> GetWords(string letters, char centralLetter, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(letters) || !LettersPattern().IsMatch(letters))
            return BadRequest("Invalid letters parameter.");

        if (!letters.Contains(centralLetter, StringComparison.OrdinalIgnoreCase))
            return BadRequest("Central letter must be one of the provided letters.");

        var result = await mediator.Send(new GetWordsQuery(letters, centralLetter), cancellationToken);
        return Ok(result);
    }
}