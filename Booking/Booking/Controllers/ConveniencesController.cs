using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Services.ControllerServices.Interfaces;
using Booking.Services.Interfaces;
using Booking.ViewModels.Convenience;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class ConveniencesController(
	DataContext context,
	IMapper mapper,
	IValidator<CreateConvenienceVm> createValidator,
	IValidator<UpdateConvenienceVm> updateValidator,
	IConveniencesControllerService service,
	IPaginationService<ConvenienceVm, ConvenienceFilterVm> pagination
) : ControllerBase {
	
	[HttpGet]
	public async Task<IActionResult> GetAll() {
		var conveniences = await context.Conveniences
			.ProjectTo<ConvenienceVm>(mapper.ConfigurationProvider)
			.ToArrayAsync();
		
		return Ok(conveniences);
	}
	
	[HttpGet]
	public async Task<IActionResult> GetPage([FromQuery] ConvenienceFilterVm vm) {
		try {
			return Ok(await pagination.GetPageAsync(vm));
		}
		catch (Exception ex) {
			return BadRequest(ex.Message);
		}
	}
	
	[HttpGet("{id}")]
	public async Task<IActionResult> GetById(long id) {
		var conveniences = await context.Conveniences
			.ProjectTo<ConvenienceVm>(mapper.ConfigurationProvider)
			.FirstOrDefaultAsync(c => c.Id == id);
		
		if (conveniences is null)
			return NotFound();
		
		return Ok(conveniences);
	}
	
	[HttpPost]
	public async Task<IActionResult> Create([FromForm] CreateConvenienceVm vm) {
		var validationResult = await createValidator.ValidateAsync(vm);
		
		if (!validationResult.IsValid)
			return BadRequest(validationResult.Errors);
		
		await service.CreateAsync(vm);
		
		return Ok();
	}
	
	[HttpPut]
	public async Task<IActionResult> Update([FromForm] UpdateConvenienceVm vm) {
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