using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Services.PaginationServices.Base;
using Booking.ViewModels.FavoriteHotel;
using Booking.ViewModels.Hotel;
using Microsoft.EntityFrameworkCore;
using Model.Context;
using Model.Entities;

namespace Booking.Services.PaginationServices;

public class FavoriteHotelsPaginationService(
	DataContext context,
	IScopedIdentityService identityService,
	IMapper mapper
) : PaginationService<FavoriteHotel, HotelVm, FavoriteHotelsFilterVm>(mapper) {

	protected override IQueryable<FavoriteHotel> GetQuery() => context.FavoriteHotels
		.Include(fh => fh.Hotel.Photos.OrderBy(p => p.Priority));

	protected override IQueryable<FavoriteHotel> FilterQuery(IQueryable<FavoriteHotel> query, FavoriteHotelsFilterVm vm) {
		query = query.Where(fh => fh.UserId == identityService.GetRequiredUser().Id);

		if (vm.IsRandomItems == true) {
			query = query.OrderBy(fh => Guid.NewGuid());
		}
		else {
			query = query.OrderBy(hr => hr.HotelId);
		}

		return query;
	}

	protected override async Task<IEnumerable<HotelVm>> MapAsync(IQueryable<FavoriteHotel> query) {
		return await query
			.Select(fh => fh.Hotel)
			.ProjectTo<HotelVm>(mapper.ConfigurationProvider)
			.ToArrayAsync();
	}
}