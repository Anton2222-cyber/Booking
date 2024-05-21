namespace Booking.ViewModels.HotelPhoto
{
    public class CreateHotelPhotoVm
    {
        public IFormFile Image { get; set; } = null!;

        public int Priority { get; set; }
    }
}
