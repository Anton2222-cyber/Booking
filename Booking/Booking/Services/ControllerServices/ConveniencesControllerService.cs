using AutoMapper;
using Booking.Services.ControllerServices.Interfaces;
using Booking.ViewModels.Convenience;
using Microsoft.EntityFrameworkCore;
using Model.Context;
using Model.Entities;

namespace Booking.Services.ControllerServices;

public class ConveniencesControllerService(
	DataContext context,
	IMapper mapper
) : IConveniencesControllerService {

	public async Task CreateAsync(CreateConvenienceVm vm) {
		var entity = mapper.Map<Convenience>(vm);

		await context.Conveniences.AddAsync(entity);

		await context.SaveChangesAsync();
	}

	public async Task UpdateAsync(UpdateConvenienceVm vm) {
		var entity = await context.Conveniences.FirstAsync(c => c.Id == vm.Id);

		entity.Name = vm.Name;

		await context.SaveChangesAsync();
	}

	public async Task DeleteIfExistsAsync(long id) {
		var entity = await context.Conveniences.FirstOrDefaultAsync(c => c.Id == id);

		if (entity is null)
			return;

		context.Conveniences.Remove(entity);
		await context.SaveChangesAsync();
	}
}