using Booking.ViewModels.HotelReview;

namespace Booking.Services.ControllerServices.Interfaces;

public interface IHotelReviewsControllerService {
	Task CreateAsync(CreateHotelReviewVm vm);
	Task DeleteIfExistsAsync(long id);
	Task UpdateAsync(UpdateHotelReviewVm vm);
}