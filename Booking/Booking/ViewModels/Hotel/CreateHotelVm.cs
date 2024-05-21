using Booking.ViewModels.Address;
using Booking.ViewModels.HotelPhoto;
using Model.Entities;

namespace Booking.ViewModels.Hotel
{
    public class CreateHotelVm
    {
        public string Name { get; set; } = null!;

        public string Description { get; set; } = null!;

        public double Rating { get; set; }

        public CreateAddressVm Address { get; set; } = null!;
    }
}
