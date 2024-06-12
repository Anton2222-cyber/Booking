using Booking.ViewModels.HotelReview;

namespace Booking.Services.ControllerServices.Interfaces;

public interface IHotelReviewsControllerService {
	Task CreateAsync(CreateHotelReviewVm vm);
	Task UpdateAsync(UpdateHotelReviewVm vm);
	Task DeleteIfExistsAsync(long id);
}