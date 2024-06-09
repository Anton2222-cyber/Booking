using Booking.ViewModels.FavoriteHotel;

namespace Booking.Services.ControllerServices.Interfaces;

public interface IFavoriteHotelsControllerService {
	Task CreateAsync(CreateFavoriteHotelVm vm);
	Task DeleteIfExistsAsync(long hotelId);
}