using Booking.ViewModels.Other;
using Booking.ViewModels.Pagination;

namespace Booking.ViewModels.Room;

public class RoomFilterVm : PaginationVm {
	public string? Name { get; set; }

	public decimal? Price { get; set; }
	public decimal? MinPrice { get; set; }
	public decimal? MaxPrice { get; set; }

	public int? AdultPlaces { get; set; }
	public int? MinAdultPlaces { get; set; }
	public int? MaxAdultPlaces { get; set; }

	public int? ChildrenPlaces { get; set; }
	public int? MinChildrenPlaces { get; set; }
	public int? MaxChildrenPlaces { get; set; }

	public long? HotelId { get; set; }

	public long? UserId { get; set; }

	public IEnumerable<long>? ConvenienceIds { get; set; }

	public TimeSpanVm? FreeTime { get; set; }

	public bool? IsRandomItems { get; set; }
}
