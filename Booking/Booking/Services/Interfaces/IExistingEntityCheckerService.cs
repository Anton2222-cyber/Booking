namespace Booking.Services.Interfaces;

public interface IExistingEntityCheckerService {
	Task<bool> IsCorrectHotelId(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectHotelReviewId(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectConvenienceId(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectConvenienceIds(IEnumerable<long>? ids, CancellationToken cancellationToken);
	Task<bool> IsCorrectRoomId(long id, CancellationToken cancellationToken);
}