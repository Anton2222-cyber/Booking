using Booking.Services.Interfaces;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Processing;

namespace Booking.Services;

public class ImageService(
	IConfiguration configuration
	) : IImageService {

	public async Task<string> SaveImageAsync(IFormFile image) {
		using MemoryStream ms = new();
		await image.CopyToAsync(ms);
		string fileName = await SaveImageAsync(ms.ToArray());
		return fileName;
	}

	public async Task<List<string>> SaveImagesAsync(ICollection<IFormFile> images) {
		List<string> result = [];

		try {
			foreach (var image in images) {
				result.Add(await SaveImageAsync(image));
			}
		}
		catch (Exception) {
			result.ForEach(DeleteImageIfExists);
			throw;
		}

		return result;
	}

	public async Task<string> SaveImageAsync(string base64) {
		if (base64.Contains(','))
			base64 = base64.Split(',')[1];
		var bytes = Convert.FromBase64String(base64);
		var fileName = await SaveImageAsync(bytes);
		return fileName;
	}

	public async Task<string> SaveImageAsync(byte[] bytes) {
		List<int> sizes = configuration.GetRequiredSection("ImageSizes").Get<List<int>>()
			?? throw new Exception("ImageSizes reading error");

		if (sizes.Count == 0)
			throw new Exception("ImageSizes not inicialized");

		string imageName = $"{Path.GetRandomFileName()}.webp";

		var tasks = sizes
			.Select(s => SaveImageAsync(bytes, imageName, s))
			.ToArray();

		await Task.WhenAll(tasks);

		return imageName;
	}

	private async Task SaveImageAsync(byte[] bytes, string name, int size) {
		string dirSaveImage = Path.Combine(ImagesDir, $"{size}_{name}");

		using (var image = Image.Load(bytes)) {
			image.Mutate(imageProcessingContext => {
				imageProcessingContext.Resize(new ResizeOptions {
					Size = new Size(Math.Min(image.Width, size), Math.Min(image.Height, size)),
					Mode = ResizeMode.Max
				});
			});

			using var stream = File.Create(dirSaveImage);
			await image.SaveAsync(stream, new WebpEncoder());
		}
	}

	public async Task<List<string>> SaveImagesAsync(ICollection<byte[]> bytesArray) {
		List<string> result = [];

		try {
			foreach (var bytes in bytesArray) {
				result.Add(await SaveImageAsync(bytes));
			}
		}
		catch (Exception) {
			result.ForEach(DeleteImageIfExists);
			throw;
		}

		return result;
	}

	public bool IsImageExists(string name) {
		return File.Exists(Path.Combine(ImagesDir, name));
	}

	public async Task<byte[]> LoadBytesAsync(string name) {
		return await File.ReadAllBytesAsync(Path.Combine(ImagesDir, name));
	}

	public string ImagesDir => Path.Combine(
		Directory.GetCurrentDirectory(),
		configuration["DataDir"] ?? throw new NullReferenceException("DataDir"),
		configuration["ImagesDir"] ?? throw new NullReferenceException("Images")
	);

	public void DeleteImage(string nameWithFormat) {
		File.Delete(Path.Combine(ImagesDir, nameWithFormat));
	}

	public void DeleteImages(ICollection<string> images) {
		foreach (var image in images)
			DeleteImage(image);
	}

	public void DeleteImageIfExists(string nameWithFormat) {
		if (File.Exists(Path.Combine(ImagesDir, nameWithFormat))) {
			DeleteImage(nameWithFormat);
		}
	}

	public void DeleteImagesIfExists(ICollection<string> images) {
		foreach (var image in images)
			DeleteImageIfExists(image);
	}
}
