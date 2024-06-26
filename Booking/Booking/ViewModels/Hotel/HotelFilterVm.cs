﻿using Booking.ViewModels.Pagination;

namespace Booking.ViewModels.Hotel;

public class HotelFilterVm : PaginationVm {
	public string? Name { get; set; }

	public string? Description { get; set; }

	public double? Rating { get; set; }

	public double? MinRating { get; set; }
	public double? MaxRating { get; set; }

	public long? UserId { get; set; }

	public HotelAddressFilterVm? Address { get; set; }

	public long? TypeId { get; set; }

	public bool? IsRandomItems { get; set; }
}
