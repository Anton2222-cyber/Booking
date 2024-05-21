using Booking.ViewModels.City;

namespace Booking.Services.Interfaces {
	public interface ICitiesControllerService {
        Task CreateAsync(CreateCityVm vm);
        Task UpdateAsync(UpdateCityVm vm);
        Task DeleteIfExistsAsync(long id);
    }
}
