namespace Booking.Services.Interfaces;

public interface IImageService
{
    string ImagesDir { get; }

    void DeleteImage(string nameWithFormat);
    void DeleteImageIfExists(string nameWithFormat);
    void DeleteImages(IEnumerable<string> images);
    void DeleteImagesIfExists(IEnumerable<string> images);
    Task<byte[]> LoadBytesAsync(string name);
    Task<string> SaveImageAsync(byte[] bytes);
    Task<string> SaveImageAsync(IFormFile image);
    Task<string> SaveImageAsync(string base64);
    Task<List<string>> SaveImagesAsync(IEnumerable<byte[]> bytesArray);
    Task<List<string>> SaveImagesAsync(IEnumerable<IFormFile> images);
}