using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Services.ControllerServices.Interfaces;
using Booking.Services.Interfaces;
using Booking.ViewModels.Room;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class RoomsController(
	DataContext context,
	IMapper mapper,
	IValidator<CreateRoomVm> createValidator,
	IValidator<UpdateRoomVm> updateValidator,
	IRoomsControllerService service,
	IPaginationService<RoomVm, RoomFilterVm> pagination
	) : ControllerBase {

	[HttpGet]
	public async Task<IActionResult> GetAll() {
		var rooms = await context.Rooms
			.Include(r => r.Photos.OrderBy(p => p.Priority))
			.ProjectTo<RoomVm>(mapper.ConfigurationProvider)
			.ToArrayAsync();

		return Ok(rooms);
	}

	[HttpGet]
	public async Task<IActionResult> GetPage([FromQuery] RoomFilterVm vm) {
		try {
			return Ok(await pagination.GetPageAsync(vm));
		}
		catch (Exception ex) {
			return BadRequest(ex.Message);
		}
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetById(long id) {
		var room = await context.Rooms
			.Include(r => r.Photos.OrderBy(p => p.Priority))
			.ProjectTo<RoomVm>(mapper.ConfigurationProvider)
			.FirstOrDefaultAsync(r => r.Id == id);

		if (room is null)
			return NotFound();

		return Ok(room);
	}

	[HttpPost]
	public async Task<IActionResult> Create([FromForm] CreateRoomVm vm) {
		var validationResult = await createValidator.ValidateAsync(vm);

		if (!validationResult.IsValid)
			return BadRequest(validationResult.Errors);

		await service.CreateAsync(vm);

		return Ok();
	}

	[HttpPut]
	public async Task<IActionResult> Update([FromForm] UpdateRoomVm vm) {
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
