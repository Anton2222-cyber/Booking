using Booking.ViewModels.Pagination;

namespace Booking.ViewModels.FavoriteHotel;

public class FavoriteHotelsFilterVm : PaginationVm {
	public bool? IsRandomItems { get; set; }
}
