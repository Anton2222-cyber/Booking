namespace Booking.ViewModels.Booking;

public class BookingVm {
	public long Id { get; set; }

	public DateTime From { get; set; }

	public DateTime To { get; set; }

	public long RoomId { get; set; }

	public long UserId { get; set; }
}