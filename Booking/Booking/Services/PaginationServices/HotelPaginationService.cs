using AutoMapper;
using Booking.Services.PaginationServices.Base;
using Booking.ViewModels.Hotel;
using Microsoft.EntityFrameworkCore;
using Model.Context;
using Model.Entities;

namespace Booking.Services.PaginationServices;

public class HotelPaginationService(
	DataContext context,
	IMapper mapper
) : PaginationService<Hotel, HotelVm, HotelFilterVm>(mapper) {

	protected override IQueryable<Hotel> GetQuery() => context.Hotels.Include(h => h.Photos.OrderBy(p => p.Priority));

	protected override IQueryable<Hotel> FilterQuery(IQueryable<Hotel> query, HotelFilterVm vm) {
		if (vm.IsRandomItems == true) {
			query = query.OrderBy(h => Guid.NewGuid());
		}
		else {
			query = query.OrderBy(h => h.Id);
		}

		if (vm.Name is not null)
			query = query.Where(h => h.Name.ToLower().Contains(vm.Name.ToLower()));

		if (vm.Description is not null)
			query = query.Where(h => h.Name.ToLower().Contains(vm.Description.ToLower()));

		if (vm.Rating is not null)
			query = query.Where(
				h => h.Rooms
					.SelectMany(
						r => r.Bookings.SelectMany(b => b.Reviews)
					)
					.Average(r => r.Score)
					.GetValueOrDefault(0) == vm.Rating
			);

		if (vm.MinRating is not null)
			query = query.Where(
				h => h.Rooms
					.SelectMany(
						r => r.Bookings.SelectMany(b => b.Reviews)
					)
					.Average(r => r.Score)
					.GetValueOrDefault(0) >= vm.MinRating
			);
		if (vm.MaxRating is not null)
			query = query.Where(
				h => h.Rooms
					.SelectMany(
						r => r.Bookings.SelectMany(b => b.Reviews)
					)
					.Average(r => r.Score)
					.GetValueOrDefault(0) <= vm.MaxRating
			);

		if (vm.UserId is not null)
			query = query.Where(h => h.UserId == vm.UserId);

		if (vm.Address is not null) {
			HotelAddressFilterVm address = vm.Address;

			if (address.Id is not null)
				query = query.Where(h => h.AddressId == address.Id);

			if (address.Street is not null)
				query = query.Where(h => h.Address.Street.ToLower().Contains(address.Street));

			if (address.HouseNumber is not null)
				query = query.Where(h => h.Address.HouseNumber.ToLower().Contains(address.HouseNumber));

			if (address.City is not null) {
				HotelAddressCityFilterVm city = address.City;

				if (city.Id is not null)
					query = query.Where(h => h.Address.CityId == city.Id);

				if (city.Name is not null)
					query = query.Where(h => h.Address.City.Name.ToLower().Contains(city.Name.ToLower()));

				if (city.Longitude is not null)
					query = query.Where(h => h.Address.City.Longitude == city.Longitude);

				if (city.Latitude is not null)
					query = query.Where(h => h.Address.City.Latitude == city.Latitude);

				if (city.MinLongitude is not null)
					query = query.Where(h => h.Address.City.Longitude >= city.MinLongitude);
				if (city.MaxLongitude is not null)
					query = query.Where(h => h.Address.City.Longitude <= city.MaxLongitude);

				if (city.MinLatitude is not null)
					query = query.Where(h => h.Address.City.Latitude >= city.MinLatitude);
				if (city.MaxLatitude is not null)
					query = query.Where(h => h.Address.City.Latitude <= city.MaxLatitude);

				if (city.CountryId is not null)
					query = query.Where(h => h.Address.City.CountryId == city.CountryId);
			}
		}

		if (vm.TypeId is not null)
			query = query.Where(h => h.TypeId == vm.TypeId);

		return query;
	}

	private static double GetAverageScore(Hotel hotel) =>
		hotel.Rooms
			.SelectMany(
				r => r.Bookings.SelectMany(b => b.Reviews)
			)
			.Average(r => r.Score)
			.GetValueOrDefault(0);
}
