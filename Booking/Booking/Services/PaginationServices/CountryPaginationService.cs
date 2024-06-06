using AutoMapper;
using Booking.Services.PaginationServices.Base;
using Booking.ViewModels.Country;
using Model.Context;
using Model.Entities;

namespace Booking.Services.PaginationServices;

public class CountryPaginationService(
	DataContext context,
	IMapper mapper
) : PaginationService<Country, CountryVm, CountryFilterVm>(mapper) {

	protected override IQueryable<Country> GetQuery() => context.Countries.OrderBy(c => c.Id);

	protected override IQueryable<Country> FilterQuery(IQueryable<Country> query, CountryFilterVm paginationVm) {
		if (paginationVm.Name is not null)
			query = query.Where(c => c.Name.ToLower().Contains(paginationVm.Name.ToLower()));

		return query;
	}
}
