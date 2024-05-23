namespace Model.Entities;

public class Hotel {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public string Description { get; set; } = null!;

	public double Rating { get; set; }

	public long AddressId { get; set; }
	public Address Address { get; set; } = null!;

	public ICollection<HotelPhoto> Photos { get; set; } = null!;

	public ICollection<HotelReview> Reviews { get; set; } = null!;
}
