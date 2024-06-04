using Booking.ViewModels.Pagination;

namespace Booking.ViewModels.HotelType;

public class HotelTypeFilterVm : PaginationVm {
	public string? Name { get; set; }
}