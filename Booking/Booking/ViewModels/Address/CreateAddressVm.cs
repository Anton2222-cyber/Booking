namespace Booking.ViewModels.Address;

public class CreateAddressVm {
	public string Street { get; set; } = null!;

	public string HouseNumber { get; set; } = null!;

	public double Longitude { get; set; }

	public double Latitude { get; set; }

	public long CityId { get; set; }
}
