using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace backend.Application.CrossclimbSets.Queries;

public class GetRandomCrossclimbSetQuery : IRequest<CrossclimbSetDto>
{
}

public class GetRandomCrossclimbSetQueryHandler : IRequestHandler<GetRandomCrossclimbSetQuery, CrossclimbSetDto>
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public GetRandomCrossclimbSetQueryHandler(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<CrossclimbSetDto> Handle(GetRandomCrossclimbSetQuery request, CancellationToken cancellationToken)
    {
        var entity = await _context.CrossclimbSets
            .OrderBy(r => EF.Functions.Random())
            .FirstOrDefaultAsync(cancellationToken);

        if (entity == null)
            throw new Exception("No crossclimb sets found.");

        return _mapper.Map<CrossclimbSetDto>(entity);
    }
}
