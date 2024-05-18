namespace Booking.Models.City
{
    public class CityCreateViewModel
    {
        public string Name { get; set; }
        public int CountryId { get; set; }
        public double lat { get; set; }
        public double lng { get; set; }
        public IFormFile Image { get; set; }
    }
}