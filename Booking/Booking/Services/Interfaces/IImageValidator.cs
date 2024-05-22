namespace Booking.Services.Interfaces;

public interface IImageValidator {
	Task<bool> IsValidImageAsync(IFormFile image, CancellationToken cancellationToken);
	Task<bool> IsValidImagesAsync(IEnumerable<IFormFile> images, CancellationToken cancellationToken);
}