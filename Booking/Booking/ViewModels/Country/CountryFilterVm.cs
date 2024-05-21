using Booking.ViewModels.Pagination;

namespace Booking.ViewModels.Country;

public class CountryFilterVm : PaginationVm {
	public string? Name { get; set; }
}
