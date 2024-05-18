using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.ViewModels.Country;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class CountriesController(
	DataContext context,
	IMapper mapper
	) : ControllerBase {

	[HttpGet]
	public async Task<IActionResult> GetAll() {
		var countries = await context.Countries
			.ProjectTo<CountryVm>(mapper.ConfigurationProvider)
			.ToArrayAsync();

		return Ok(countries);
	}
}
