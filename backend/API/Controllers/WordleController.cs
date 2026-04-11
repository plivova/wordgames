namespace backend.API.Controllers;

using System.Text.RegularExpressions;
using Application.Words.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public partial class WordleController(IMediator mediator, WordleGameStore gameStore) : ControllerBase
{
    [GeneratedRegex(@"^[a-záčďéěíňóřšťúůýž]{5}$")]
    private static partial Regex WordPattern();

    [HttpGet("new-game")]
    public async Task<ActionResult<object>> NewGame(CancellationToken cancellationToken)
    {
        var word = await mediator.Send(new GetRandomWordQuery(5), cancellationToken);
        var gameId = gameStore.CreateGame(word.Text, 6);
        return Ok(new { gameId });
    }

    [HttpPost("guess")]
    public async Task<ActionResult<WordleEvaluationDto>> Guess(
        [FromBody] WordleGuessRequest request,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.GameId) || string.IsNullOrWhiteSpace(request.Guess))
            return BadRequest("Missing gameId or guess.");

        if (!WordPattern().IsMatch(request.Guess.ToLower()))
            return BadRequest("Invalid word format.");

        if (gameStore.IsGameOver(request.GameId))
            return BadRequest("Game is already over.");

        var result = await mediator.Send(
            new EvaluateWordleGuessQuery(request.GameId, request.Guess),
            cancellationToken);

        if (result == null)
            return NotFound("Game not found.");

        if (!result.IsValidWord)
            return Ok(result);

        var guessNumber = gameStore.IncrementGuess(request.GameId);
        var isGameOver = result.IsCorrect || guessNumber >= 6;

        if (isGameOver && !result.IsCorrect)
            result.TargetWord = gameStore.EndGame(request.GameId);
        else if (result.IsCorrect)
            gameStore.EndGame(request.GameId);

        return Ok(result);
    }
}

public class WordleGuessRequest
{
    public string GameId { get; set; } = "";
    public string Guess { get; set; } = "";
}
