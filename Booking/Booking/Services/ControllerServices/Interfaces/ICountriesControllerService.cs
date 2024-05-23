using Booking.ViewModels.Country;

namespace Booking.Services.ControllerServices.Interfaces;

public interface ICountriesControllerService {
	Task CreateAsync(CreateCountryVm vm);
	Task UpdateAsync(UpdateCountryVm vm);
	Task DeleteIfExistsAsync(long id);
}