using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Extensions;

public static class IApplicationBuilderExtensions {
	public static async Task MigrateAsync(this IApplicationBuilder builder) {
		using var scope = builder.ApplicationServices
			.GetRequiredService<IServiceScopeFactory>()
			.CreateScope();

		var context = scope.ServiceProvider.GetRequiredService<DataContext>();

		await context.Database.MigrateAsync();
	}
}
