using Booking.ViewModels.Address;
using Booking.ViewModels.HotelPhoto;

namespace Booking.ViewModels.Hotel
{
    public class UpdateHotelVm
    {
        public long Id { get; set; }

        public string Name { get; set; } = null!;

        public string Description { get; set; } = null!;

        public double Rating { get; set; }

        public string Street { get; set; } = null!;

        public string HouseNumber { get; set; } = null!;

        public long CityId { get; set; }
    }
}
