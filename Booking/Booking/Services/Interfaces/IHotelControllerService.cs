using Booking.ViewModels.Hotel;

namespace Booking.Services.Interfaces
{
    public interface IHotelControllerService
    {
        Task CreateAsync(CreateHotelVm vm);
        Task UpdateAsync(UpdateHotelVm vm);
        Task DeleteIfExistsAsync(long id);
    }
}
