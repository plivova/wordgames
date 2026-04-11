using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace backend.Application.LetterSets.Queries;

public class GetRandomLetterSetQuery : IRequest<LetterSetDto>
{
    // no parameters, just fetch one random letter set
}

public class GetRandomLetterSetQueryHandler : IRequestHandler<GetRandomLetterSetQuery, LetterSetDto>
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public GetRandomLetterSetQueryHandler(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<LetterSetDto> Handle(GetRandomLetterSetQuery request, CancellationToken cancellationToken)
    {
        var letterSetEntity = await _context.LetterSets
            .OrderBy(r => EF.Functions.Random())   // EF Core way to order randomly in MySQL or SQLite
            .FirstOrDefaultAsync(cancellationToken);

        if (letterSetEntity == null)
            throw new InvalidOperationException("No letter sets found.");

        return _mapper.Map<LetterSetDto>(letterSetEntity);
    }
}