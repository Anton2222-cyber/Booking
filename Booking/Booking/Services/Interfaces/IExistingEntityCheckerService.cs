namespace Booking.Services.Interfaces;

public interface IExistingEntityCheckerService {
	Task<bool> IsCorrectHotelId(long Id, CancellationToken cancellationToken);
	Task<bool> IsCorrectHotelReviewId(long Id, CancellationToken cancellationToken);
}