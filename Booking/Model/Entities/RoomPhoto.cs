namespace Model.Entities;

public class RoomPhoto {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public int Priority { get; set; }

	public long RoomId { get; set; }
	public Room Room { get; set; } = null!;
}