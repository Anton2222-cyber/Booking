using AutoMapper;
using Booking.ViewModels.Account;
using Booking.ViewModels.Address;
using Booking.ViewModels.City;
using Booking.ViewModels.Country;
using Booking.ViewModels.Hotel;
using Booking.ViewModels.HotelPhoto;
using Model.Entities;
using Model.Entities.Identity;

namespace Booking.Mapper;

public class AppMapProfile : Profile {
	public AppMapProfile() {
		CreateMap<RegisterVm, User>();

		CreateMap<Country, CountryVm>();
		CreateMap<CreateCountryVm, Country>()
			.ForMember(c => c.Image, opt => opt.Ignore());

		CreateMap<City, CityVm>();
		CreateMap<CreateCityVm, City>()
			.ForMember(c => c.Image, opt => opt.Ignore());

		CreateMap<Address, AddressVm>();
		CreateMap<CreateAddressVm, Address>();

		CreateMap<HotelPhoto, HotelPhotoVm>();
		CreateMap<CreateHotelPhotoVm, HotelPhoto>()
			.ForMember(c => c.Name, opt => opt.Ignore());

		CreateMap<Hotel, HotelVm>();
		CreateMap<CreateHotelVm, Hotel>();
		CreateMap<UpdateHotelVm, Hotel>();
	}
}
