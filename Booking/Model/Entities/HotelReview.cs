using Model.Entities.Identity;

namespace Model.Entities;

public class HotelReview {
	public long Id { get; set; }

	public string Description { get; set; } = null!;

	public double? Score { get; set; }

	public long UserId { get; set; }
	public User User { get; set; } = null!;

	public long BookingId { get; set; }
	public Booking Booking { get; set; } = null!;

	public ICollection<HotelReviewPhoto> Photos { get; set; } = null!;
}
