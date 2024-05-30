namespace Booking.ViewModels.Booking;

public class UpdateBookingVm {
	public long Id { get; set; }

	public DateTime From { get; set; }

	public DateTime To { get; set; }

	public long RoomId { get; set; }
}