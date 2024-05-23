using Booking.ViewModels.Pagination;

namespace Booking.ViewModels.HotelReview;

public class HotelReviewsFilterVm : PaginationVm {
	public string? Description { get; set; }

	public double? Score { get; set; }

	public double? MinScore { get; set; }
	public double? MaxScore { get; set; }

	public HotelReviewsUserFilterVm? User { get; set; }

	public long? HotelId { get; set; }

	public bool? IsRandomItems { get; set; }
}
