using Model.Entities.Identity;

namespace Model.Entities;

public class FavoriteHotel {
	public long HotelId { get; set; }
	public Hotel Hotel { get; set; } = null!;

	public long UserId { get; set; }
	public User User { get; set; } = null!;
}