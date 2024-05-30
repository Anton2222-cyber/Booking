using Booking.ViewModels.Pagination;

namespace Booking.ViewModels.City;

public class BookingFilterVm : PaginationVm {
	public DateTime? From { get; set; }
	public DateTime? MinFrom { get; set; }
	public DateTime? MaxFrom { get; set; }

	public DateTime? To { get; set; }
	public DateTime? MinTo { get; set; }
	public DateTime? MaxTo { get; set; }

	public long? RoomId { get; set; }

	public bool? IsRandomItems { get; set; }
}