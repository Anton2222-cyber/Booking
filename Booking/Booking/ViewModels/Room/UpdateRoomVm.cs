namespace Booking.ViewModels.Room;

public class UpdateRoomVm {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public decimal Price { get; set; }

	public int AdultPlaces { get; set; }

	public int ChildrenPlaces { get; set; }

	public long HotelId { get; set; }

	public IEnumerable<IFormFile> Photos { get; set; } = null!;

	public IEnumerable<long>? ConvenienceIds { get; set; } = null!;
}