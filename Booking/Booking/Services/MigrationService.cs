using Booking.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Services;

public class MigrationService(
	DataContext context
	) : IMigrationService {

	public async Task MigrateLatestAsync() {
		var pendingMigrations = await context.Database.GetPendingMigrationsAsync();

		if (await IsMigrationNotPendingAsync("20240523100929_Added_HotelReview_table")
			&& await IsMigrationPendingAsync("20240612125429_Added_BookingId_and_deleted_HotelId_from_HotelReviews_table")) {

			await context.HotelReviews.ExecuteDeleteAsync();
		}

		await context.Database.MigrateAsync();
	}

	private async Task<IEnumerable<string>> GetPendingMigrationsAsync()
		=> await context.Database.GetPendingMigrationsAsync();

	private async Task<bool> IsPendingMigrationBeforeOrEqualsAsync(string name) {
		var migrations = await context.Database.GetPendingMigrationsAsync();

		return migrations.TakeWhile(pm => pm != name)
			.Contains(name);
	}

	private async Task<bool> IsPendingMigrationAfterOrEqualsAsync(string name) {
		var migrations = await context.Database.GetPendingMigrationsAsync();

		return migrations.SkipWhile(pm => pm != name)
			.Contains(name);
	}

	private async Task<bool> IsMigrationPendingAsync(string name) {
		var migrations = await context.Database.GetPendingMigrationsAsync();

		return migrations.Contains(name);
	}

	private async Task<bool> IsMigrationNotPendingAsync(string name)
		=> !await IsMigrationPendingAsync(name);
}