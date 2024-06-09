using Booking.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Model.Entities.Identity;

namespace Booking.Services;

public class ScopedIdentityService(
	IIdentityService identityService
) : IScopedIdentityService {

	public User? User { get; private set; } = null;

	public async Task InitCurrentUserAsync(ControllerBase controller) {
		User = await identityService.GetCurrentUserAsync(controller);
	}

	public User GetRequiredUser() =>
		User ?? throw new Exception($"User in {nameof(ScopedIdentityService)} is not inicialized");
}