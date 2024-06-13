using Booking.ViewModels.Account;

namespace Booking.ViewModels.HotelReview;

public class HotelReviewVm {
	public long Id { get; set; }

	public string Description { get; set; } = null!;

	public double? Score { get; set; }

	public UserVm User { get; set; } = null!;

	public long BookingId { get; set; }

	public long HotelId { get; set; }

	public IEnumerable<HotelReviewPhotoVm> Photos { get; set; } = null!;
}
