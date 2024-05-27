using Booking.ViewModels.Pagination;

namespace Booking.ViewModels.Convenience;

public class ConvenienceFilterVm : PaginationVm {
	public string? Name { get; set; }
	
	public bool? IsRandomItems { get; set; }
}