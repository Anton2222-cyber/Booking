using AutoMapper;
using Booking.Services.PaginationServices.Base;
using Booking.ViewModels.HotelType;
using Model.Context;
using Model.Entities;

namespace Booking.Services.PaginationServices;

public class HotelTypesPaginationService(
	DataContext context,
	IMapper mapper
) : PaginationService<HotelType, HotelTypeVm, HotelTypeFilterVm>(mapper) {

	protected override IQueryable<HotelType> GetQuery() => context.HotelTypes;

	protected override IQueryable<HotelType> FilterQuery(IQueryable<HotelType> query, HotelTypeFilterVm paginationVm) {
		if (paginationVm.Name is not null)
			query = query.Where(ht => ht.Name.ToLower().Contains(paginationVm.Name.ToLower()));

		return query;
	}
}