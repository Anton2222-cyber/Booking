﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Services;
using Booking.Services.ControllerServices.Interfaces;
using Booking.Services.Interfaces;
using Booking.ViewModels.HotelReview;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class HotelReviewsController(
	DataContext context,
	IMapper mapper,
	IPaginationService<HotelReviewVm, HotelReviewsFilterVm> pagination,
	IScopedIdentityService scopedIdentityService,
	IHotelReviewsControllerService service,
	IValidator<CreateHotelReviewVm> createValidator,
	IValidator<UpdateHotelReviewVm> updateValidator
	) : ControllerBase {

	[HttpGet]
	public async Task<IActionResult> GetAll() {
		var reviews = await context.HotelReviews
			.Include(hr => hr.Photos.OrderBy(p => p.Priority))
			.ProjectTo<HotelReviewVm>(mapper.ConfigurationProvider)
			.ToArrayAsync();
		return Ok(reviews);
	}

	[HttpGet]
	public async Task<IActionResult> GetPage([FromQuery] HotelReviewsFilterVm vm) {
		try {
			return Ok(await pagination.GetPageAsync(vm));
		}
		catch (Exception ex) {
			return BadRequest(ex.Message);
		}
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetById(long id) {
		var review = await context.HotelReviews
			.Include(hr => hr.Photos.OrderBy(p => p.Priority))
			.ProjectTo<HotelReviewVm>(mapper.ConfigurationProvider)
			.FirstOrDefaultAsync(c => c.Id == id);

		if (review is null)
			return NotFound();

		return Ok(review);
	}

	[HttpPost]
	[Authorize(Roles = "Admin,User")]
	public async Task<IActionResult> Create([FromForm] CreateHotelReviewVm vm) {
		await scopedIdentityService.InitCurrentUserAsync(this);

		var validationResult = await createValidator.ValidateAsync(vm);

		if (!validationResult.IsValid)
			return BadRequest(validationResult.Errors);

		await service.CreateAsync(vm);

		return Ok();
	}

	[HttpPut]
	[Authorize(Roles = "Admin,User")]
	public async Task<IActionResult> Update([FromForm] UpdateHotelReviewVm vm) {
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
		await scopedIdentityService.InitCurrentUserAsync(this);

		await service.DeleteIfExistsAsync(id);

		return Ok();
	}
}
