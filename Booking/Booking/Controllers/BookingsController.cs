using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Services.ControllerServices.Interfaces;
using Booking.Services.Interfaces;
using Booking.ViewModels.Booking;
using Booking.ViewModels.Convenience;
using FluentValidation;
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
	IValidator<UpdateConvenienceVm> updateValidator,
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
	public async Task<IActionResult> Create([FromForm] CreateBookingVm vm) {
		var validationResult = await createValidator.ValidateAsync(vm);

		if (!validationResult.IsValid)
			return BadRequest(validationResult.Errors);

		var user = await identityService.GetCurrentUserAsync(this);

		await service.CreateAsync(vm, user.Id);

		return Ok();
	}

	//[HttpPut]
	//public async Task<IActionResult> Update([FromForm] UpdateConvenienceVm vm) {
	//	var validationResult = await updateValidator.ValidateAsync(vm);

	//	if (!validationResult.IsValid)
	//		return BadRequest(validationResult.Errors);

	//	await service.UpdateAsync(vm);

	//	return Ok();
	//}

	[HttpDelete("{id}")]
	public async Task<IActionResult> Delete(long id) {
		await service.DeleteIfExistsAsync(id);

		return Ok();
	}
}
