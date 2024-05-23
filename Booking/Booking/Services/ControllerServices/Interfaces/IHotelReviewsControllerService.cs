using Booking.ViewModels.HotelReview;
using Model.Entities.Identity;

namespace Booking.Services.ControllerServices.Interfaces;

public interface IHotelReviewsControllerService {
	Task CreateAsync(CreateHotelReviewVm vm, User user);
	Task DeleteIfExistsAsync(long id);
	Task UpdateAsync(UpdateHotelReviewVm vm);
}