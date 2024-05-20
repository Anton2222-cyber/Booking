using Booking.ViewModels.Country;

namespace Booking.ViewModels.City
{
    public class UpdateCityVm
    {
        public long Id { get; set; }

        public string Name { get; set; } = null!;

        public IFormFile Image { get; set; } = null!;

        public double Longitude { get; set; }

        public double Latitude { get; set; }

        public long CountryId { get; set; }
    }
}
