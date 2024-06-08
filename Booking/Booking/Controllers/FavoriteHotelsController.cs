using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Services;
using Booking.Services.ControllerServices.Interfaces;
using Booking.Services.Interfaces;
using Booking.ViewModels.City;
using Booking.ViewModels.FavoriteHotel;
using Booking.ViewModels.Hotel;
using Booking.ViewModels.Pagination;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class FavoriteHotelsController(
	IFavoriteHotelsControllerService service,
	DataContext context,
	IScopedIdentityService identityService,
	IValidator<CreateFavoriteHotelVm> createValidator,
	IMapper mapper,
	IPaginationService<HotelVm, FavoriteHotelsFilterVm> pagination
) : ControllerBase {

	[HttpGet]
	public async Task<IActionResult> GetAll() {
		var entities = await context.FavoriteHotels
			.Include(fh => fh.Hotel.Photos.OrderBy(p => p.Priority))
			.Select(fh => fh.Hotel)
			.ProjectTo<HotelVm>(mapper.ConfigurationProvider)
			.ToArrayAsync();

		return Ok(entities);
	}

	[HttpGet]
	[Authorize(Roles = "Admin,User")]
	public async Task<IActionResult> GetPage([FromQuery] FavoriteHotelsFilterVm vm) {
		await identityService.InitCurrentUserAsync(this);

		try {
			return Ok(await pagination.GetPageAsync(vm));
		}
		catch (Exception ex) {
			return BadRequest(ex.Message);
		}
	}

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
