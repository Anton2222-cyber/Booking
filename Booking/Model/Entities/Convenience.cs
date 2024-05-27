namespace Model.Entities;

public class Convenience {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public ICollection<RoomConvenience> Rooms { get; set; } = null!;
}
