using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Services;
using Booking.Services.ControllerServices.Interfaces;
using Booking.Services.Interfaces;
using Booking.ViewModels.Room;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
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
	IPaginationService<RoomVm, RoomFilterVm> pagination,
	IScopedIdentityService scopedIdentityService,
	IIdentityService identityService
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
	[Authorize(Roles = "Admin,User")]
	public async Task<IActionResult> Create([FromForm] CreateRoomVm vm) {
		await scopedIdentityService.InitCurrentUserAsync(this);

		var validationResult = await createValidator.ValidateAsync(vm);

		if (!validationResult.IsValid)
			return BadRequest(validationResult.Errors);

		await service.CreateAsync(vm);

		return Ok();
	}

	[HttpPut]
	[Authorize(Roles = "Admin,User")]
	public async Task<IActionResult> Update([FromForm] UpdateRoomVm vm) {
		await scopedIdentityService.InitCurrentUserAsync(this);

		var validationResult = await updateValidator.ValidateAsync(vm);

		if (!validationResult.IsValid)
			return BadRequest(validationResult.Errors);

		await service.UpdateAsync(vm);

		return Ok();
	}

	[HttpDelete]
	[Authorize(Roles = "Admin,User")]
	public async Task<IActionResult> Delete(long id) {
		var entity = await context.Rooms.Include(r => r.Hotel).FirstOrDefaultAsync(r => r.Id == id);

		if (entity is not null) {
			var user = await identityService.GetCurrentUserAsync(this);

			if (entity.Hotel.UserId != user.Id)
				return BadRequest("The room is not own");

			await service.DeleteIfExistsAsync(id);
		}

		return Ok();
	}
}
