namespace Model.Entities;

public class Room {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public decimal Price { get; set; }

	public int AdultPlaces { get; set; }

	public int ChildrenPlaces { get; set; }

	public ICollection<RoomConvenience> Conveniences { get; set; } = null!;
}
