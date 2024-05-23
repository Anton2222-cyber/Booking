using Booking.ViewModels.City;

namespace Booking.Services.ControllerServices.Interfaces;

public interface ICitiesControllerService {
	Task CreateAsync(CreateCityVm vm);
	Task UpdateAsync(UpdateCityVm vm);
	Task DeleteIfExistsAsync(long id);
}
