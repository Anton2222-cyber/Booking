using Booking.ViewModels.HotelType;

namespace Booking.Services.ControllerServices.Interfaces;

public interface IHotelTypeControllerService {
	Task CreateAsync(CreateHotelTypeVm vm);
	Task UpdateAsync(UpdateHotelTypeVm vm);
	Task DeleteIfExistsAsync(long id);
}
