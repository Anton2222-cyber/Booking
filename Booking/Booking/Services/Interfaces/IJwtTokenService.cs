using Model.Entities.Identity;

namespace Booking.Services.Interfaces;

public interface IJwtTokenService {
	Task<string> CreateTokenAsync(User user);
}