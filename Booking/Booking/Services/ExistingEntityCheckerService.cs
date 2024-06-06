using Booking.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Services;

public class ExistingEntityCheckerService(
	DataContext context
) : IExistingEntityCheckerService {

	public async Task<bool> IsCorrectCountryId(long id, CancellationToken cancellationToken) =>
		await context.Countries.AnyAsync(c => c.Id == id, cancellationToken);

	public async Task<bool> IsCorrectHotelReviewId(long id, CancellationToken cancellationToken) =>
		await context.HotelReviews.AnyAsync(h => h.Id == id, cancellationToken);

	public async Task<bool> IsCorrectHotelId(long id, CancellationToken cancellationToken) =>
		await context.Hotels.AnyAsync(h => h.Id == id, cancellationToken);

	public async Task<bool> IsCorrectHotelTypeId(long id, CancellationToken cancellationToken) =>
		await context.HotelTypes.AnyAsync(ht => ht.Id == id, cancellationToken);

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

	public async Task<bool> IsCorrectBookingId(long id, CancellationToken cancellationToken) =>
		await context.Bookings.AnyAsync(b => b.Id == id, cancellationToken);
}