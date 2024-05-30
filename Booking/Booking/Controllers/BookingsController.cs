﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Services.ControllerServices.Interfaces;
using Booking.Services.Interfaces;
using Booking.ViewModels.Booking;
using Booking.ViewModels.Convenience;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class BookingsController(
	DataContext context,
	IMapper mapper,
	IValidator<CreateBookingVm> createValidator,
	IValidator<UpdateBookingVm> updateValidator,
	IBookingControllerService service,
	IIdentityService identityService
) : ControllerBase {

	[HttpGet]
	public async Task<IActionResult> GetAll() {
		var entities = await context.Bookings
			.ProjectTo<BookingVm>(mapper.ConfigurationProvider)
			.ToArrayAsync();

		return Ok(entities);
	}

	[HttpPost]
	[Authorize(Roles = "Admin,User")]
	public async Task<IActionResult> Create([FromForm] CreateBookingVm vm) {
		var validationResult = await createValidator.ValidateAsync(vm);

		if (!validationResult.IsValid)
			return BadRequest(validationResult.Errors);

		var user = await identityService.GetCurrentUserAsync(this);

		await service.CreateAsync(vm, user.Id);

		return Ok();
	}

	[HttpPut]
	[Authorize(Roles = "Admin,User")]
	public async Task<IActionResult> Update([FromForm] UpdateBookingVm vm) {
		var validationResult = await updateValidator.ValidateAsync(vm);

		if (!validationResult.IsValid)
			return BadRequest(validationResult.Errors);

		var booking = await context.Bookings.FirstAsync(b => b.Id == vm.Id);
		var user = await identityService.GetCurrentUserAsync(this);
		if (booking.UserId != user.Id)
			return Forbid("The booking is not own");

		await service.UpdateAsync(vm);

		return Ok();
	}

	[HttpDelete("{id}")]
	[Authorize(Roles = "Admin,User")]
	public async Task<IActionResult> Delete(long id) {
		var entity = await context.Bookings.FirstOrDefaultAsync(b => b.Id == id);

		if (entity is not null) {
			var user = await identityService.GetCurrentUserAsync(this);

			if (entity.UserId != user.Id)
				return Forbid("The booking is not own");

			await service.DeleteIfExistsAsync(id);
		}

		return Ok();
	}
}
