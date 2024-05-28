namespace Model.Entities;

public class RoomConvenience {
	public long RoomId { get; set; }
	public Room Room { get; set; } = null!;

	public long ConvenienceId { get; set; }
	public Convenience Convenience { get; set; } = null!;
}
