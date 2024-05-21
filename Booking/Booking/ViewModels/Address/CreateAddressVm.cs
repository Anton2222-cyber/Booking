namespace Booking.ViewModels.Address
{
    public class CreateAddressVm
    {
        public string Street { get; set; } = null!;

        public string HouseNumber { get; set; } = null!;

        public long CityId { get; set; }
    }
}
