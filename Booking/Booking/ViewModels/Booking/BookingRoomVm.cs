﻿using Booking.ViewModels.Convenience;
using Booking.ViewModels.Room;

namespace Booking.ViewModels.Booking;

public class BookingRoomVm {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public decimal Price { get; set; }

	public int AdultPlaces { get; set; }

	public int ChildrenPlaces { get; set; }

	public long HotelId { get; set; }

	public IEnumerable<RoomPhotoVm> Photos { get; set; } = null!;

	public IEnumerable<ConvenienceVm> Conveniences { get; set; } = null!;
}