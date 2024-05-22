using Booking.ViewModels.HotelPhoto;

namespace Booking.Services.Interfaces
{
    public interface IHotelPhotoControllerService
    {
        Task CreateAsync(CreateHotelPhotoVm vm);
        Task UpdateAsync(UpdateHotelPhotoVm vm);
        Task DeleteIfExistsAsync(long id);
    }
}
