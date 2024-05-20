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

	protected override IQueryable<City> GetQuery() => context.Cities;

	protected override IQueryable<City> FilterQuery(IQueryable<City> query, CityFilterVm vm) {
		if (vm.IsRandomItems == true) {
			query = query.OrderBy(c => Guid.NewGuid());
		}
		else {
			query = query.OrderBy(c => c.Id);
		}

		if (vm.Name is not null)
			query = query.Where(c => c.Name.ToLower().Contains(vm.Name.ToLower()));

		if (vm.Longitude is not null)
			query = query.Where(c => c.Longitude == vm.Longitude);

		if (vm.Latitude is not null)
			query = query.Where(c => c.Latitude == vm.Latitude);

		if (vm.MinLongitude is not null)
			query = query.Where(c => c.Longitude >= vm.MinLongitude);
		if (vm.MaxLongitude is not null)
			query = query.Where(c => c.Longitude <= vm.MaxLongitude);

		if (vm.MinLatitude is not null)
			query = query.Where(c => c.Latitude >= vm.MinLatitude);
		if (vm.MaxLatitude is not null)
			query = query.Where(c => c.Latitude <= vm.MaxLatitude);

		if (vm.CountryId is not null)
			query = query.Where(c => c.CountryId == vm.CountryId);

		return query;
	}
}
