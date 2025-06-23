// // Created by Kateřina Plívová on 23.06.2025.

using backend.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace backend.Application.LetterSets.Queries;

// public class GetLetterSetQuery: IRequest<LetterSetDto>;
//
// public class GetLetterSetQueryHandler(AppDbContext context) : IRequestHandler<GetLetterSetQuery, LetterSetDto>
// {
//     public async Task<LetterSetDto> Handle(GetLetterSetQuery request, CancellationToken cancellationToken)
//     {
//         var count = await context.LetterSets.CountAsync(cancellationToken);
//         if (count == 0) throw new Exception("No letter sets found.");
//
//         var random = new Random();
//         var index = random.Next(count);
//
//         var letterSet = await context.LetterSets
//             .OrderBy(x => x.Id)
//             .Skip(index)
//             .FirstOrDefaultAsync(cancellationToken);
//
//         return letterSet!;
//     }
// }

using AutoMapper;
using MediatR;

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
            throw new Exception("No letter sets found.");

        return _mapper.Map<LetterSetDto>(letterSetEntity);
    }
}