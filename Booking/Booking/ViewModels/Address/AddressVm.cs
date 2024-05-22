using Booking.ViewModels.City;

namespace Booking.ViewModels.Address;

public class AddressVm {
	public long Id { get; set; }

	public string Street { get; set; } = null!;

	public string HouseNumber { get; set; } = null!;

	public CityVm City { get; set; } = null!;
}
