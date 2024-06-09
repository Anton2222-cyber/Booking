using Microsoft.AspNetCore.Mvc;
using Model.Entities.Identity;

namespace Booking.Services;

public interface IScopedIdentityService {
	User? User { get; }

	Task InitCurrentUserAsync(ControllerBase controller);

	User GetRequiredUser();
}