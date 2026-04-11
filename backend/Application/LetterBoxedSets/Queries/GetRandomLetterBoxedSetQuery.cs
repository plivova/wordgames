using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace backend.Application.LetterBoxedSets.Queries;

public class GetRandomLetterBoxedSetQuery : IRequest<LetterBoxedSetDto>
{
}

public class GetRandomLetterBoxedSetQueryHandler : IRequestHandler<GetRandomLetterBoxedSetQuery, LetterBoxedSetDto>
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public GetRandomLetterBoxedSetQueryHandler(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<LetterBoxedSetDto> Handle(GetRandomLetterBoxedSetQuery request, CancellationToken cancellationToken)
    {
        var entity = await _context.LetterBoxedSets
            .OrderBy(r => EF.Functions.Random())
            .FirstOrDefaultAsync(cancellationToken);

        if (entity == null)
            throw new InvalidOperationException("No letter boxed sets found.");

        return _mapper.Map<LetterBoxedSetDto>(entity);
    }
}
