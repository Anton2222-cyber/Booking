using Booking.Services.ControllerServices.Interfaces;
using Booking.ViewModels.FavoriteHotel;
using Microsoft.EntityFrameworkCore;
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
			UserId = identityService.GetRequiredUserId()
		};

		await context.FavoriteHotels.AddAsync(entity);

		await context.SaveChangesAsync();
	}

	public async Task DeleteIfExistsAsync(long hotelId) {
		var userId = identityService.GetRequiredUserId();

		await context.FavoriteHotels
		   .Where(fh => fh.HotelId == hotelId && fh.UserId == userId)
		   .ExecuteDeleteAsync();
	}
}