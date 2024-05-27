using AutoMapper;
using Booking.Services.PaginationServices.Base;
using Booking.ViewModels.Convenience;
using Model.Context;
using Model.Entities;

namespace Booking.Services.PaginationServices;

public class ConveniencePaginationService(
	DataContext context,
	IMapper mapper
) : PaginationService<Convenience, ConvenienceVm, ConvenienceFilterVm>(mapper) {
	
	protected override IQueryable<Convenience> GetQuery() => context.Conveniences;
	
	protected override IQueryable<Convenience> FilterQuery(IQueryable<Convenience> query,
		ConvenienceFilterVm paginationVm) {
		
		if (paginationVm.IsRandomItems == true)
			query = query.OrderBy(c => Guid.NewGuid());
		else
			query = query.OrderBy(c => c.Id);
		
		if (paginationVm.Name is not null)
			query = query.Where(c => c.Name.ToLower().Contains(paginationVm.Name.ToLower()));
		
		return query;
	}
}