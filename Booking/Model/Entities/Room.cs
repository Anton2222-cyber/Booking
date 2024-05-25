namespace Model.Entities;

public class Room {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public decimal Price { get; set; }

	public int AdultPlaces { get; set; }

	public int ChildrenPlaces { get; set; }

	public long HotelId { get; set; }
	public Hotel Hotel { get; set; } = null!;

	public ICollection<RoomPhoto> Photos { get; set; } = null!;

	public ICollection<RoomConvenience> Conveniences { get; set; } = null!;
}
