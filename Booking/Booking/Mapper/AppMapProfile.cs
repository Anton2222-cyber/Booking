using AutoMapper;
using Booking.ViewModels.Account;
using Booking.ViewModels.Address;
using Booking.ViewModels.Booking;
using Booking.ViewModels.City;
using Booking.ViewModels.Convenience;
using Booking.ViewModels.Country;
using Booking.ViewModels.Hotel;
using Booking.ViewModels.HotelReview;
using Booking.ViewModels.Room;
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
		CreateMap<HotelPhoto, HotelPhotoVm>();

		CreateMap<HotelReview, HotelReviewVm>();
		CreateMap<CreateHotelReviewVm, HotelReview>()
			.ForMember(h => h.Photos, opt => opt.Ignore());
		CreateMap<HotelReviewPhoto, HotelReviewPhotoVm>();

		CreateMap<Convenience, ConvenienceVm>();
		CreateMap<CreateConvenienceVm, Convenience>();

		CreateMap<Room, RoomVm>()
			.ForMember(
				r => r.Conveniences,
				opt => opt.MapFrom(
					r => r.Conveniences.Select(c => c.Convenience)
				)
			);
		CreateMap<RoomPhoto, RoomPhotoVm>();
		CreateMap<CreateRoomVm, Room>()
			.ForMember(r => r.Photos, opt => opt.Ignore())
			.ForMember(
				dest => dest.Conveniences,
				opt => opt.MapFrom(
					(r, dest) => (r.ConvenienceIds ?? [])
						.Select(id => new RoomConvenience { Room = dest, ConvenienceId = id })
				)
			);

		CreateMap<Model.Entities.Booking, BookingVm>();
		CreateMap<CreateBookingVm, Model.Entities.Booking>();
	}
}