using Microsoft.AspNetCore.Identity;

namespace Booking.Exceptions;

public class IdentityException(
	IdentityResult identityResult,
	string massage = "Identity exception"
) : Exception(massage) {

	public IdentityResult IdentityResult { get; init; } = identityResult
			?? throw new ArgumentNullException(nameof(identityResult));
}
