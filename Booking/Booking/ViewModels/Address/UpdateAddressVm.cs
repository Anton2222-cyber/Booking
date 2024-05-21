namespace Booking.ViewModels.Address
{
    public class UpdateAddressVm
    {
        public long Id { get; set; }

        public string Street { get; set; } = null!;

        public string HouseNumber { get; set; } = null!;

        public long CityId { get; set; }
    }
}
