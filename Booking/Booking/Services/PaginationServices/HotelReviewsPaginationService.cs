using AutoMapper;
using Booking.Services.PaginationServices.Base;
using Booking.ViewModels.HotelReview;
using Microsoft.EntityFrameworkCore;
using Model.Context;
using Model.Entities;

namespace Booking.Services.PaginationServices;

public class HotelReviewsPaginationService(
	DataContext context,
	IMapper mapper
	) : PaginationService<HotelReview, HotelReviewVm, HotelReviewsFilterVm>(mapper) {

	protected override IQueryable<HotelReview> GetQuery() => context.HotelReviews.Include(h => h.Photos.OrderBy(p => p.Priority));

	protected override IQueryable<HotelReview> FilterQuery(IQueryable<HotelReview> query, HotelReviewsFilterVm vm) {
		if (vm.IsRandomItems == true) {
			query = query.OrderBy(hr => Guid.NewGuid());
		}
		else {
			query = query.OrderBy(hr => hr.Id);
		}

		if (vm.Description is not null)
			query = query.Where(hr => hr.Description.ToLower().Contains(vm.Description.ToLower()));

		if (vm.Score is not null)
			query = query.Where(hr => hr.Score == vm.Score);

		if (vm.MinScore is not null)
			query = query.Where(hr => hr.Score >= vm.MinScore);
		if (vm.MaxScore is not null)
			query = query.Where(hr => hr.Score <= vm.MaxScore);

		if (vm.User is not null) {
			HotelReviewsUserFilterVm user = vm.User;

			if (user.Id is not null)
				query = query.Where(hr => hr.UserId == user.Id);

			if (user.FirstName is not null)
				query = query.Where(hr => hr.User.FirstName.ToLower().Contains(user.FirstName));

			if (user.LastName is not null)
				query = query.Where(hr => hr.User.LastName.ToLower().Contains(user.LastName));
		}

		if (vm.HotelId is not null)
			query = query.Where(hr => hr.HotelId == vm.HotelId);

		return query;
	}
}