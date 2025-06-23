// // Created by Kateřina Plívová on 23.06.2025.

using AutoMapper;
using backend.Application.LetterSets.Queries;
using backend.Domain;

namespace backend.Application.Common;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<LetterSet, LetterSetDto>();
        // TODO: Add other mappings here
    }
}