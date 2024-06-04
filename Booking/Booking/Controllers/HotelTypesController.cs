using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Services.ControllerServices.Interfaces;
using Booking.Services.Interfaces;
using Booking.ViewModels.Hotel;
using Booking.ViewModels.HotelType;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class HotelTypesController(
	DataContext context,
	IMapper mapper,
	IValidator<CreateHotelTypeVm> createValidator,
	IValidator<UpdateHotelTypeVm> updateValidator,
	IHotelTypeControllerService service,
	IPaginationService<HotelTypeVm, HotelTypeFilterVm> pagination
) : ControllerBase {

	[HttpGet]
	public async Task<IActionResult> GetAll() {
		var entities = await context.HotelTypes
			.ProjectTo<HotelTypeVm>(mapper.ConfigurationProvider)
			.ToArrayAsync();

		return Ok(entities);
	}

	[HttpGet]
	public async Task<IActionResult> GetPage([FromQuery] HotelTypeFilterVm vm) {
		try {
			return Ok(await pagination.GetPageAsync(vm));
		}
		catch (Exception ex) {
			return BadRequest(ex.Message);
		}
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetById(long id) {
		var entity = await context.HotelTypes
			.ProjectTo<HotelVm>(mapper.ConfigurationProvider)
			.FirstOrDefaultAsync(ht => ht.Id == id);

		if (entity is null)
			return NotFound();

		return Ok(entity);
	}

	[HttpPost]
	public async Task<IActionResult> Create([FromForm] CreateHotelTypeVm vm) {
		var validationResult = await createValidator.ValidateAsync(vm);

		if (!validationResult.IsValid)
			return BadRequest(validationResult.Errors);

		await service.CreateAsync(vm);

		return Ok();
	}

	[HttpPut]
	public async Task<IActionResult> Update([FromForm] UpdateHotelTypeVm vm) {
		var validationResult = await updateValidator.ValidateAsync(vm);

		if (!validationResult.IsValid)
			return BadRequest(validationResult.Errors);

		await service.UpdateAsync(vm);

		return Ok();
	}

	[HttpDelete]
	public async Task<IActionResult> Delete(long id) {
		await service.DeleteIfExistsAsync(id);
		return Ok();
	}
}
