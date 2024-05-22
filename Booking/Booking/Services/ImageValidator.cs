using Booking.Services.Interfaces;
using SixLabors.ImageSharp;

namespace Booking.Services;

public class ImageValidator : IImageValidator {
	public async Task<bool> IsValidImageAsync(IFormFile image, CancellationToken cancellationToken) {
		using var stream = image.OpenReadStream();

		try {
			using var imageInstance = await Image.LoadAsync(stream, cancellationToken);
			return true;
		}
		catch {
			return false;
		}
	}

	public async Task<bool> IsValidImagesAsync(IEnumerable<IFormFile> images, CancellationToken cancellationToken) {
		var tasts = images.Select(i => IsValidImageAsync(i, cancellationToken));

		var results = await Task.WhenAll(tasts);

		return results.All(r => r);
	}
}
