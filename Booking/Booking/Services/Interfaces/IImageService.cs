namespace Booking.Services.Interfaces;

public interface IImageService
{
    string ImagesDir { get; }

    void DeleteImage(string nameWithFormat);
    void DeleteImageIfExists(string nameWithFormat);
    void DeleteImages(ICollection<string> images);
    void DeleteImagesIfExists(ICollection<string> images);
    Task<byte[]> LoadBytesAsync(string name);
    Task<string> SaveImageAsync(byte[] bytes);
    Task<string> SaveImageAsync(IFormFile image);
    Task<string> SaveImageAsync(string base64);
    Task<List<string>> SaveImagesAsync(ICollection<byte[]> bytesArray);
    Task<List<string>> SaveImagesAsync(ICollection<IFormFile> images);
}