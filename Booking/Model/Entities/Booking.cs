using Model.Entities.Identity;

namespace Model.Entities;

public class Booking {
	public long Id { get; set; }

	public DateTime From { get; set; }

	public DateTime To { get; set; }

	public long RoomId { get; set; }
	public Room Room { get; set; } = null!;

	public long UserId { get; set; }
	public User User { get; set; } = null!;
}
