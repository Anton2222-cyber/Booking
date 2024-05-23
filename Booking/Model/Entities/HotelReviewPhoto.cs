namespace Model.Entities;

public class HotelReviewPhoto {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public int Priority { get; set; }

	public long HotelReviewId { get; set; }
	public HotelReview HotelReview { get; set; } = null!;
}
