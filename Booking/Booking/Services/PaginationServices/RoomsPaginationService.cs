using AutoMapper;
using Booking.Services.PaginationServices.Base;
using Booking.ViewModels.Room;
using Microsoft.EntityFrameworkCore;
using Model.Context;
using Model.Entities;

namespace Booking.Services.PaginationServices;

public class RoomsPaginationService(
	DataContext context,
	IMapper mapper
) : PaginationService<Room, RoomVm, RoomFilterVm>(mapper) {

	protected override IQueryable<Room> GetQuery() => context.Rooms
		.Include(r => r.Photos.OrderBy(p => p.Priority))
		.AsSplitQuery();

	protected override IQueryable<Room> FilterQuery(IQueryable<Room> query, RoomFilterVm vm) {
		if (vm.IsRandomItems == true) {
			query = query.OrderBy(r => Guid.NewGuid());
		}
		else {
			query = query.OrderBy(r => r.Id);
		}

		if (vm.Name is not null)
			query = query.Where(h => h.Name.ToLower().Contains(vm.Name.ToLower()));

		if (vm.Price is not null)
			query = query.Where(r => r.Price == vm.Price);
		if (vm.MinPrice is not null)
			query = query.Where(r => r.Price >= vm.MinPrice);
		if (vm.MaxPrice is not null)
			query = query.Where(r => r.Price <= vm.MaxPrice);

		if (vm.AdultPlaces is not null)
			query = query.Where(r => r.AdultPlaces == vm.AdultPlaces);
		if (vm.MinAdultPlaces is not null)
			query = query.Where(r => r.AdultPlaces >= vm.MinAdultPlaces);
		if (vm.MaxAdultPlaces is not null)
			query = query.Where(r => r.AdultPlaces <= vm.MaxAdultPlaces);

		if (vm.ChildrenPlaces is not null)
			query = query.Where(r => r.ChildrenPlaces == vm.ChildrenPlaces);
		if (vm.MinChildrenPlaces is not null)
			query = query.Where(r => r.ChildrenPlaces >= vm.MinChildrenPlaces);
		if (vm.MaxChildrenPlaces is not null)
			query = query.Where(r => r.ChildrenPlaces <= vm.MaxChildrenPlaces);

		if (vm.HotelId is not null)
			query = query.Where(r => r.HotelId == vm.HotelId);

		if (vm.ConvenienceIds is not null)
			query = query.Where(
				r => vm.ConvenienceIds.All(
					cId => r.Conveniences.Any(c => c.ConvenienceId == cId)
				)
			);

		if (vm.FreeTime is not null) {
			if (vm.FreeTime.From > vm.FreeTime.To)
				throw new Exception("Invalid time span");

			query = query.Where(
				r => r.Bookings.All(b =>
					(b.From < vm.FreeTime.From && b.To <= vm.FreeTime.From)
					|| (b.From >= vm.FreeTime.To && b.To > vm.FreeTime.To))
			);
		}

		return query;
	}
}