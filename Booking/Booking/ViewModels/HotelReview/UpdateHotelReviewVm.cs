namespace Booking.ViewModels.HotelReview;

public class UpdateHotelReviewVm {
	public long Id { get; set; }

	public string Description { get; set; } = null!;

	public double? Score { get; set; }

	public IEnumerable<IFormFile>? Photos { get; set; }
}