using Booking.ViewModels.Address;
using Booking.ViewModels.Pagination;

namespace Booking.ViewModels.Hotel {
	public class HotelFilterVm : PaginationVm {
		public string? Name { get; set; }

		public string? Description { get; set; }

		public double? Rating { get; set; }

		public double? MinRating { get; set; }
		public double? MaxRating { get; set; }

		public AddressFilterVm? Address { get; set; }

		public bool? IsRandomItems { get; set; }
	}
}
