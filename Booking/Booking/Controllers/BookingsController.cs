using Booking.Services.ControllerServices.Interfaces;
using Booking.Services.Interfaces;
using Booking.ViewModels.Booking;
using Booking.ViewModels.Convenience;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Model.Context;

namespace Booking.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class BookingsController(
	DataContext context,
	IValidator<CreateBookingVm> createValidator,
	IValidator<UpdateConvenienceVm> updateValidator,
	IBookingControllerService service,
	IIdentityService identityService
) : ControllerBase {

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

	//[HttpDelete("{id}")]
	//public async Task<IActionResult> Delete(long id) {
	//	await service.DeleteIfExistsAsync(id);

	//	return Ok();
	//}
}
