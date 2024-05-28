namespace Booking.Services.Interfaces;

public interface IMigrationService {
	Task MigrateLatestAsync();
}
