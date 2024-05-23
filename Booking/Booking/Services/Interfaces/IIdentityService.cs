using Microsoft.AspNetCore.Mvc;
using Model.Entities.Identity;

namespace Booking.Services.Interfaces;

public interface IIdentityService {
	Task<User> GetCurrentUserAsync(ControllerBase controller);
}