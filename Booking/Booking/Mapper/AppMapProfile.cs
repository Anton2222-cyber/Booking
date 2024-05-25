using AutoMapper;
using Booking.ViewModels.Account;
using Booking.ViewModels.Address;
using Booking.ViewModels.City;
using Booking.ViewModels.Convenience;
using Booking.ViewModels.Country;
using Booking.ViewModels.Hotel;
using Booking.ViewModels.HotelReview;
using Model.Entities;
using Model.Entities.Identity;

namespace Booking.Mapper;

public class AppMapProfile : Profile {
	public AppMapProfile() {
		CreateMap<RegisterVm, User>();
		CreateMap<User, UserVm>();
		
		CreateMap<Country, CountryVm>();
		CreateMap<CreateCountryVm, Country>()
			.ForMember(c => c.Image, opt => opt.Ignore());
		
		CreateMap<City, CityVm>();
		CreateMap<CreateCityVm, City>()
			.ForMember(c => c.Image, opt => opt.Ignore());
		
		CreateMap<Address, AddressVm>();
		CreateMap<CreateAddressVm, Address>();
		
		CreateMap<HotelPhoto, HotelPhotoVm>();
		
		CreateMap<Hotel, HotelVm>()
			.ForMember(
				h => h.Rating,
				opt => opt.MapFrom(
					h => h.Reviews
						.Average(r => r.Score)
						.GetValueOrDefault(0)
				)
			)
			.ForMember(
				h => h.Reviews,
				opt => opt.MapFrom(
					h => h.Reviews.Count()
				)
			);
		CreateMap<CreateHotelVm, Hotel>()
			.ForMember(h => h.Photos, opt => opt.Ignore());
		CreateMap<UpdateHotelVm, Hotel>();
		CreateMap<HotelPhoto, HotelPhotoVm>();
		
		CreateMap<HotelReview, HotelReviewVm>();
		CreateMap<CreateHotelReviewVm, HotelReview>()
			.ForMember(h => h.Photos, opt => opt.Ignore());
		CreateMap<UpdateHotelReviewVm, HotelReview>()
			.ForMember(h => h.Photos, opt => opt.Ignore());
		CreateMap<HotelReviewPhoto, HotelReviewPhotoVm>();
		
		CreateMap<Convenience, ConvenienceVm>();
		CreateMap<CreateConvenienceVm, Convenience>();
	}
}