// // Created by Kateřina Plívová on 23.06.2025.

using AutoMapper;
using backend.Application.LetterSets.Queries;
using backend.Application.CrossclimbSets.Queries;
using backend.Application.LetterBoxedSets.Queries;
using backend.Application.Words.Queries;
using backend.Domain;

namespace backend.Application.Common;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<LetterSet, LetterSetDto>();
        CreateMap<LetterBoxedSet, LetterBoxedSetDto>();
        CreateMap<Word, WordDto>();
        CreateMap<CrossclimbSet, CrossclimbSetDto>();
    }
}