namespace Booking.ViewModels.HotelPhoto
{
    public class HotelPhotoVm
    {
        public long Id { get; set; }

        public string Name { get; set; } = null!;

        public int Priority { get; set; }

        public long HotelId { get; set; }
    }
}
