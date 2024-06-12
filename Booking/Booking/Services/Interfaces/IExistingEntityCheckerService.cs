namespace Booking.Services.Interfaces;

public interface IExistingEntityCheckerService {
	Task<bool> IsCorrectCountryId(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectHotelId(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectHotelIdOfCurrentUser(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectHotelTypeId(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectHotelReviewId(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectHotelReviewByBookingIdAndUserId(long bookingId, CancellationToken cancellationToken);
	Task<bool> IsCorrectFavoriteHotelKey(long hotelId, long userId, CancellationToken cancellationToken);
	Task<bool> IsCorrectConvenienceId(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectConvenienceIds(IEnumerable<long>? ids, CancellationToken cancellationToken);
	Task<bool> IsCorrectRoomId(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectRoomIdOfCurrentUser(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectBookingId(long id, CancellationToken cancellationToken);
}