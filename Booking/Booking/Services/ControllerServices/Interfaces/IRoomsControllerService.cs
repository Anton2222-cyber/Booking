using Booking.ViewModels.Room;

namespace Booking.Services.ControllerServices.Interfaces;

public interface IRoomsControllerService {
	Task CreateAsync(CreateRoomVm vm);
	Task UpdateAsync(UpdateRoomVm vm);
	Task DeleteIfExistsAsync(long id);
}