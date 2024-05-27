using Booking.ViewModels.Account;
using Model.Entities.Identity;

namespace Booking.Services.ControllerServices.Interfaces;

public interface IAccountsControllerService {
	Task<User> SignUpAsync(RegisterVm vm);
	Task<User> GoogleSignInAsync(GoogleSignInVm model);
}