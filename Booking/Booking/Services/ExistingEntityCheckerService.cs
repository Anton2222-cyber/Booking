using Booking.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Services;

public class ExistingEntityCheckerService(
	DataContext context,
	IScopedIdentityService identityService
) : IExistingEntityCheckerService {

	public async Task<bool> IsCorrectCountryId(long id, CancellationToken cancellationToken) =>
		await context.Countries.AnyAsync(c => c.Id == id, cancellationToken);

	public async Task<bool> IsCorrectHotelReviewId(long id, CancellationToken cancellationToken) =>
		await context.HotelReviews.AnyAsync(h => h.Id == id, cancellationToken);

	public async Task<bool> IsCorrectHotelReviewByBookingIdAndUserId(long bookingId, CancellationToken cancellationToken) =>
		await context.HotelReviews.AnyAsync(
			hr => hr.BookingId == bookingId && hr.UserId == identityService.GetRequiredUserId(),
			cancellationToken
		);

	public async Task<bool> IsCorrectHotelReviewIdOfCurrentUser(long id, CancellationToken cancellationToken) =>
		await context.HotelReviews.AnyAsync(hr => hr.Id == id && hr.UserId == identityService.GetRequiredUserId(), cancellationToken);

	public async Task<bool> IsCorrectHotelId(long id, CancellationToken cancellationToken) =>
		await context.Hotels.AnyAsync(h => h.Id == id, cancellationToken);

	public async Task<bool> IsCorrectHotelIdOfCurrentUser(long id, CancellationToken cancellationToken) =>
		await context.Hotels.AnyAsync(h => h.Id == id && h.UserId == identityService.GetRequiredUserId(), cancellationToken);

	public async Task<bool> IsCorrectHotelTypeId(long id, CancellationToken cancellationToken) =>
		await context.HotelTypes.AnyAsync(ht => ht.Id == id, cancellationToken);

	public async Task<bool> IsCorrectFavoriteHotelKey(long hotelId, long userId, CancellationToken cancellationToken) =>
		await context.FavoriteHotels.AnyAsync(fh => fh.HotelId == hotelId && fh.UserId == userId, cancellationToken);

	public async Task<bool> IsCorrectConvenienceId(long id, CancellationToken cancellationToken) =>
		await context.Conveniences.AnyAsync(c => c.Id == id, cancellationToken);

	public async Task<bool> IsCorrectConvenienceIds(IEnumerable<long>? ids, CancellationToken cancellationToken) {
		if (ids is null)
			return true;

		var conveniencesFromDb = await context.Conveniences
			.Where(c => ids.Contains(c.Id))
			.Select(c => c.Id)
			.ToArrayAsync();

		return ids.All(id => conveniencesFromDb.Contains(id));
	}

	public async Task<bool> IsCorrectRoomId(long id, CancellationToken cancellationToken) =>
		await context.Rooms.AnyAsync(r => r.Id == id, cancellationToken);

	public async Task<bool> IsCorrectRoomIdOfCurrentUser(long id, CancellationToken cancellationToken) =>
		await context.Rooms
			.Include(r => r.Hotel)
			.AnyAsync(r => r.Id == id && r.Hotel.UserId == identityService.GetRequiredUser().Id, cancellationToken);

	public async Task<bool> IsCorrectBookingId(long id, CancellationToken cancellationToken) =>
		await context.Bookings.AnyAsync(b => b.Id == id, cancellationToken);
}