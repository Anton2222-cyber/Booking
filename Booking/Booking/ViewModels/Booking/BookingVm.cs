namespace Booking.ViewModels.Booking;

public class BookingVm {
	public long Id { get; set; }

	public DateTime From { get; set; }

	public DateTime To { get; set; }

	public BookingRoomVm Room { get; set; } = null!;
}
