using Booking.Services.ControllerServices.Interfaces;
using Booking.ViewModels.FavoriteHotel;
using Model.Context;
using Model.Entities;

namespace Booking.Services.ControllerServices;

public class FavoriteHotelsControllerService(
	DataContext context,
	IScopedIdentityService identityService
) : IFavoriteHotelsControllerService {

	public async Task CreateAsync(CreateFavoriteHotelVm vm) {
		var entity = new FavoriteHotel {
			HotelId = vm.HotelId,
			UserId = identityService.GetRequiredUser().Id
		};

		await context.FavoriteHotels.AddAsync(entity);

		await context.SaveChangesAsync();
	}
}