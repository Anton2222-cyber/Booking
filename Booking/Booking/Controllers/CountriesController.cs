using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Services.Interfaces;
using Booking.ViewModels.Country;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model.Context;
using System.Diagnostics.Metrics;

namespace Booking.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class CountriesController(
	DataContext context,
	IMapper mapper,
	IValidator<CreateCountryVm> createValidator,
	ICountriesControllerService service
	) : ControllerBase {

	[HttpGet]
	public async Task<IActionResult> GetAll() {
		var countries = await context.Countries
			.ProjectTo<CountryVm>(mapper.ConfigurationProvider)
			.ToArrayAsync();

		return Ok(countries);
	}

	[HttpPost]
	public async Task<IActionResult> Create([FromForm] CreateCountryVm vm) {
		var validationResult = await createValidator.ValidateAsync(vm);

		if (!validationResult.IsValid)
			return BadRequest(validationResult.Errors);

		var country = await service.CreateAsync(vm);

		return Ok(mapper.Map<CountryVm>(country));
	}
}
