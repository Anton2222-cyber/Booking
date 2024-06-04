using AutoMapper;
using Booking.Services.ControllerServices.Interfaces;
using Booking.ViewModels.HotelType;
using Microsoft.EntityFrameworkCore;
using Model.Context;
using Model.Entities;

namespace Booking.Services.ControllerServices;

public class HotelTypesControllerService(
	DataContext context,
	IMapper mapper
) : IHotelTypeControllerService {

	public async Task CreateAsync(CreateHotelTypeVm vm) {
		var entity = mapper.Map<HotelType>(vm);

		context.HotelTypes.Add(entity);

		await context.SaveChangesAsync();
	}

	public async Task UpdateAsync(UpdateHotelTypeVm vm) {
		var entity = await context.HotelTypes
			.FirstAsync(ht => ht.Id == vm.Id);

		entity.Name = vm.Name;

		await context.SaveChangesAsync();
	}

	public async Task DeleteIfExistsAsync(long id) {
		await context.HotelTypes
			.Where(ht => ht.Id == id)
			.ExecuteDeleteAsync();

		//var entity = await context.HotelTypes
		//	.FirstOrDefaultAsync(ht => ht.Id == id);

		//if (entity is null)
		//	return;

		//context.HotelTypes.Remove(entity);
		//await context.SaveChangesAsync();
	}
}