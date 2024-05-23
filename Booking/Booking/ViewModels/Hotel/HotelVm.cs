using Booking.ViewModels.Address;

namespace Booking.ViewModels.Hotel;

public class HotelVm {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public string Description { get; set; } = null!;

	public double Rating { get; set; }

	public int Reviews { get; set; }

	public AddressVm Address { get; set; } = null!;

	public IEnumerable<HotelPhotoVm> Photos { get; set; } = null!;
}
