using AutoMapper;
using Booking.Services.PaginationServices.Base;
using Booking.ViewModels.Booking;
using Booking.ViewModels.City;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Services.PaginationServices;

public class BookingPaginationService(
	DataContext context,
	IMapper mapper,
	IScopedIdentityService scopedIdentityService
) : PaginationService<Model.Entities.Booking, BookingVm, BookingFilterVm>(mapper) {

	protected override IQueryable<Model.Entities.Booking> GetQuery() => context.Bookings
		.Include(b => b.Room)
		.ThenInclude(b => b.Photos.OrderBy(p => p.Priority));

	protected override IQueryable<Model.Entities.Booking> FilterQuery(IQueryable<Model.Entities.Booking> query, BookingFilterVm vm) {
		query = query.Where(b => b.UserId == scopedIdentityService.GetRequiredUser().Id);

		if (vm.IsRandomItems == true) {
			query = query.OrderBy(b => Guid.NewGuid());
		}
		else {
			query = query.OrderBy(b => b.Id);
		}

		if (vm.From is not null)
			query = query.Where(b => b.From == vm.From);
		if (vm.MinFrom is not null)
			query = query.Where(b => b.From >= vm.MinFrom);
		if (vm.MaxFrom is not null)
			query = query.Where(b => b.From <= vm.MaxFrom);

		if (vm.To is not null)
			query = query.Where(b => b.To == vm.To);
		if (vm.MinTo is not null)
			query = query.Where(b => b.To >= vm.MinTo);
		if (vm.MaxTo is not null)
			query = query.Where(b => b.To <= vm.MaxTo);

		if (vm.RoomId is not null)
			query = query.Where(b => b.RoomId == vm.RoomId);

		return query;
	}
}