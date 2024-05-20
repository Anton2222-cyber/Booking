using AutoMapper;
using Booking.Services.PaginationServices.Base;
using Booking.ViewModels.City;
using Model.Context;
using Model.Entities;

namespace Booking.Services.PaginationServices;

public class CityPaginationService(
	DataContext context,
	IMapper mapper
	) : PaginationService<City, CityVm, CityFilterVm>(mapper) {

	protected override IQueryable<City> GetQuery() => context.Cities.OrderBy(c => c.Id);

	protected override IQueryable<City> FilterQuery(IQueryable<City> query, CityFilterVm paginationVm) {
		if (paginationVm.Name is not null)
			query = query.Where(c => c.Name.ToLower().Contains(paginationVm.Name.ToLower()));

		if (paginationVm.Longitude is not null)
			query = query.Where(c => c.Longitude == paginationVm.Longitude);

		if (paginationVm.Latitude is not null)
			query = query.Where(c => c.Latitude == paginationVm.Latitude);

		if (paginationVm.MinLongitude is not null)
			query = query.Where(c => c.Longitude >= paginationVm.MinLongitude);
		if (paginationVm.MaxLongitude is not null)
			query = query.Where(c => c.Longitude <= paginationVm.MaxLongitude);

		if (paginationVm.MinLatitude is not null)
			query = query.Where(c => c.Latitude >= paginationVm.MinLatitude);
		if (paginationVm.MaxLatitude is not null)
			query = query.Where(c => c.Latitude <= paginationVm.MaxLatitude);

		if (paginationVm.CountryId is not null)
			query = query.Where(c => c.CountryId == paginationVm.CountryId);

		return query;
	}
}
