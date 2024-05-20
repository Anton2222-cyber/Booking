using Booking.ViewModels.City;
using Model.Entities;

namespace Booking.Services.Interfaces
{
    public interface ICitiesControllerService {
        Task<City> CreateAsync(CreateCityVm vm);
        Task<City> UpdateAsync(UpdateCityVm vm);
        Task DeleteIfExistsAsync(long id);
    }
}
