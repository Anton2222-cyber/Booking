namespace Booking.ViewModels.HotelReview;

public class CreateHotelReviewVm {
	public string Description { get; set; } = null!;

	public double? Score { get; set; }

	public long HotelId { get; set; }

	public IEnumerable<IFormFile>? Photos { get; set; }
}
