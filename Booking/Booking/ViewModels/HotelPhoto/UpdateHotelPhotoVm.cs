namespace Booking.ViewModels.HotelPhoto
{
    public class UpdateHotelPhotoVm
    {
        public long Id { get; set; }

        public IFormFile Image { get; set; } = null!;

        public int Priority { get; set; }
    }
}
