using Booking.Services;
using Booking.Services.ControllerServices.Interfaces;
using Booking.ViewModels.FavoriteHotel;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Booking.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class FavoriteHotelsController(
	IFavoriteHotelsControllerService service,
	IScopedIdentityService identityService,
	IValidator<CreateFavoriteHotelVm> createValidator
) : ControllerBase {

	[HttpPost]
	[Authorize(Roles = "Admin,User")]
	public async Task<IActionResult> Create([FromForm] CreateFavoriteHotelVm vm) {
		await identityService.InitCurrentUserAsync(this);

		var validationResult = await createValidator.ValidateAsync(vm);

		if (!validationResult.IsValid)
			return BadRequest(validationResult.Errors);

		await service.CreateAsync(vm);

		return Ok();
	}

	[HttpDelete]
	[Authorize(Roles = "Admin,User")]
	public async Task<IActionResult> Delete(long hotelId) {
		await identityService.InitCurrentUserAsync(this);

		await service.DeleteIfExistsAsync(hotelId);

		return Ok();
	}
}
