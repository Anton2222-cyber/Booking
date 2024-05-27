using Booking.ViewModels.Convenience;

namespace Booking.Services.ControllerServices.Interfaces;

public interface IConveniencesControllerService {
	Task CreateAsync(CreateConvenienceVm vm);
	Task UpdateAsync(UpdateConvenienceVm vm);
	Task DeleteIfExistsAsync(long id);
}