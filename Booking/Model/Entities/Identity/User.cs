﻿using Microsoft.AspNetCore.Identity;

namespace Model.Entities.Identity;

public class User : IdentityUser<long> {
	public string FirstName { get; set; } = null!;

	public string LastName { get; set; } = null!;

	public string Photo { get; set; } = null!;

	public virtual ICollection<UserRole> UserRoles { get; set; } = null!;

	public ICollection<Hotel> Hotels { get; set; } = null!;

	public ICollection<HotelReview> HotelReviews { get; set; } = null!;

	public ICollection<Booking> Bookings { get; set; } = null!;
}