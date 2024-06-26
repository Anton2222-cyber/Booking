﻿using Booking.ViewModels.Address;

namespace Booking.ViewModels.Hotel;

public class CreateHotelVm {
	public string Name { get; set; } = null!;

	public string Description { get; set; } = null!;

	public CreateAddressVm Address { get; set; } = null!;

	public long TypeId { get; set; }

	public IEnumerable<IFormFile> Photos { get; set; } = null!;
}
