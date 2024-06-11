using Model.Entities.Identity;

namespace Model.Entities;

public class Hotel {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public string Description { get; set; } = null!;

	public long AddressId { get; set; }
	public Address Address { get; set; } = null!;

	public long TypeId { get; set; }
	public HotelType Type { get; set; } = null!;

	public long UserId { get; set; }
	public User User { get; set; } = null!;

	public ICollection<HotelPhoto> Photos { get; set; } = null!;

	public ICollection<HotelReview> Reviews { get; set; } = null!;

	public ICollection<Room> Rooms { get; set; } = null!;
}
