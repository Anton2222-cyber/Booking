using AutoMapper;
using Booking.ViewModels.Country;
using Model.Entities;

namespace Booking.Mapper;

public class AppMapProfile : Profile {
	public AppMapProfile() {
		CreateMap<Country, CountryVm>();
	}
}
