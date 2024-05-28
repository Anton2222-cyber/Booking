using AutoMapper;
using Booking.Services.ControllerServices.Interfaces;
using Booking.ViewModels.Booking;
using Booking.ViewModels.City;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Services.ControllerServices;

public class BookingsControllerService(
	DataContext context,
	IMapper mapper
) : IBookingControllerService {

	public async Task CreateAsync(CreateBookingVm vm, long userId) {
		var entity = mapper.Map<Model.Entities.Booking>(vm);

		entity.UserId = userId;

		await context.Bookings.AddAsync(entity);

		await context.SaveChangesAsync();
	}

	public async Task UpdateAsync(UpdateCityVm vm) {
		//var entity = await context.Conveniences.FirstAsync(c => c.Id == vm.Id);

		//entity.Name = vm.Name;

		//await context.SaveChangesAsync();
	}

	public async Task DeleteIfExistsAsync(long id) {
		var entity = await context.Bookings.FirstOrDefaultAsync(b => b.Id == id);

		if (entity is null)
			return;

		context.Bookings.Remove(entity);
		await context.SaveChangesAsync();
	}
}