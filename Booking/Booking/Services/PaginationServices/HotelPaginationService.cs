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
			query = query.Where(h => h.Rating == vm.Rating);

		if (vm.MinRating is not null)
			query = query.Where(h => h.Rating >= vm.Rating);
		if (vm.MaxRating is not null)
			query = query.Where(h => h.Rating <= vm.Rating);

		if (vm.Address?.Id is not null)
			query = query.Where(h => h.Address.Id == vm.Address.Id);

		if (vm.Address?.Street is not null)
			query = query.Where(h => h.Address.Street.ToLower().Contains(vm.Address.Street));

		if (vm.Address?.HouseNumber is not null)
			query = query.Where(h => h.Address.HouseNumber.ToLower().Contains(vm.Address.HouseNumber));

		if (vm.Address?.CityId is not null)
			query = query.Where(h => h.Address.CityId == vm.Address.CityId);

		return query;
	}
}
