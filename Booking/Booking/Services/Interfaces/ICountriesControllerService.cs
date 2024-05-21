using Booking.ViewModels.Country;
using Model.Entities;

namespace Booking.Services.Interfaces;

public interface ICountriesControllerService {
	Task CreateAsync(CreateCountryVm vm);
	Task UpdateAsync(UpdateCountryVm vm);
	Task DeleteIfExistsAsync(long id);
}