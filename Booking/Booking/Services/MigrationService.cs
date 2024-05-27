using Booking.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Services;

public class MigrationService(
	DataContext context
	) : IMigrationService {

	public async Task MigrateLatestAsync() {
		await context.Database.MigrateAsync();
	}
}