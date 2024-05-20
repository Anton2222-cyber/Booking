namespace Model.Entities;

public class HotelPhoto {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public int Priority { get; set; }

	public long HotelId { get; set; }
	public Hotel Hotel { get; set; } = null!;
}
