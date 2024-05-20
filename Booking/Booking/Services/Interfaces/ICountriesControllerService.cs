using Booking.ViewModels.Country;
using Model.Entities;

namespace Booking.Services.Interfaces;

public interface ICountriesControllerService {
	Task<Country> CreateAsync(CreateCountryVm vm);
	Task<Country> UpdateAsync(UpdateCountryVm vm);
	Task DeleteIfExistsAsync(long id);
}