using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Services.Interfaces;
using Booking.ViewModels.Country;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class CountriesController(
	DataContext context,
	IMapper mapper,
	IValidator<CreateCountryVm> createValidator,
	IValidator<UpdateCountryVm> updateValidator,
	ICountriesControllerService service,
	IPaginationService<CountryVm, CountryFilterVm> pagination
	) : ControllerBase {

	[HttpGet]
	public async Task<IActionResult> GetAll() {
		var countries = await context.Countries
			.ProjectTo<CountryVm>(mapper.ConfigurationProvider)
			.ToArrayAsync();

		return Ok(countries);
	}

	[HttpGet]
	public async Task<IActionResult> GetPage([FromQuery] CountryFilterVm vm) {
		try {
			return Ok(await pagination.GetPageAsync(vm));
		}
		catch (Exception ex) {
			return BadRequest(ex.Message);
		}
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetById(long id) {
		var countries = await context.Countries
			.ProjectTo<CountryVm>(mapper.ConfigurationProvider)
			.FirstOrDefaultAsync(c => c.Id == id);

		if (countries is null)
			return NotFound();

		return Ok(countries);
	}

	[HttpPost]
	public async Task<IActionResult> Create([FromForm] CreateCountryVm vm) {
		var validationResult = await createValidator.ValidateAsync(vm);

		if (!validationResult.IsValid)
			return BadRequest(validationResult.Errors);

		await service.CreateAsync(vm);

		return Ok();
	}

	[HttpPut]
	public async Task<IActionResult> Update([FromForm] UpdateCountryVm vm) {
		var validationResult = await updateValidator.ValidateAsync(vm);

		if (!validationResult.IsValid)
			return BadRequest(validationResult.Errors);

		await service.UpdateAsync(vm);

		return Ok();
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> Delete(long id) {
		await service.DeleteIfExistsAsync(id);

		return Ok();
	}
}
