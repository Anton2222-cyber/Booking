namespace Booking.Models.Hotel
{
    public class HotelCreateViewModel
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public double Rating { get; set; }
        public int CityId { get; set; }
        public IFormFile Image { get; set; }
    }
}
