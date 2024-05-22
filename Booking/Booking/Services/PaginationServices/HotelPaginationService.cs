using AutoMapper;
using Booking.Services.PaginationServices.Base;
using Booking.ViewModels.City;
using Booking.ViewModels.Hotel;
using Microsoft.EntityFrameworkCore;
using Model.Context;
using Model.Entities;

namespace Booking.Services.PaginationServices {
	public class HotelPaginationService(
		DataContext context,
		IMapper mapper
		) : PaginationService<Hotel, HotelVm, HotelFilterVm>(mapper) {

		protected override IQueryable<Hotel> GetQuery() => context.Hotels.Include(h => h.Photos.OrderBy(p => p.Priority));

		protected override IQueryable<Hotel> FilterQuery(IQueryable<Hotel> query, HotelFilterVm vm) {
			if (vm.IsRandomItems == true) {
				query = query.OrderBy(c => Guid.NewGuid());
			}
			else {
				query = query.OrderBy(c => c.Id);
			}

			if (vm.Name is not null)
				query = query.Where(c => c.Name.ToLower().Contains(vm.Name.ToLower()));

			if (vm.Description is not null)
				query = query.Where(c => c.Name.ToLower().Contains(vm.Description.ToLower()));

			if (vm.Rating is not null)
				query = query.Where(c => c.Rating == vm.Rating);

			if (vm.MinRating is not null)
				query = query.Where(c => c.Rating >= vm.Rating);
			if (vm.MaxRating is not null)
				query = query.Where(c => c.Rating <= vm.Rating);

			if (vm.AddressId is not null)
				query = query.Where(c => c.AddressId == vm.AddressId);

			return query;
		}
	}
}
