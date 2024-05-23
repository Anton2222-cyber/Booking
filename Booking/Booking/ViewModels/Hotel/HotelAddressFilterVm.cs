namespace Booking.ViewModels.Hotel;

public class HotelAddressFilterVm {
	public long? Id { get; set; }

	public string? Street { get; set; }

	public string? HouseNumber { get; set; }

	public HotelAddressCityFilterVm? City { get; set; }
}
