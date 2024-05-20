namespace Booking.ViewModels.Country;

public class CreateCountryVm {
	public string Name { get; set; } = null!;

	public IFormFile Image { get; set; } = null!;
}
