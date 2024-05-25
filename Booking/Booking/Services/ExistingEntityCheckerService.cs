using Booking.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Services;

public class ExistingEntityCheckerService(
	DataContext context
) : IExistingEntityCheckerService {
	
	public async Task<bool> IsCorrectHotelReviewId(long Id, CancellationToken cancellationToken) =>
		await context.HotelReviews.AnyAsync(h => h.Id == Id, cancellationToken);
	
	public async Task<bool> IsCorrectHotelId(long Id, CancellationToken cancellationToken) =>
		await context.Hotels.AnyAsync(h => h.Id == Id, cancellationToken);
	
	public async Task<bool> IsCorrectConvenienceId(long Id, CancellationToken cancellationToken) =>
		await context.Conveniences.AnyAsync(c => c.Id == Id, cancellationToken);
}