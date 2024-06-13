using AutoMapper;
using Booking.Services.ControllerServices.Interfaces;
using Booking.Services.Interfaces;
using Booking.ViewModels.HotelReview;
using Microsoft.EntityFrameworkCore;
using Model.Context;
using Model.Entities;

namespace Booking.Services.ControllerServices;

public class HotelReviewsControllerService(
	DataContext context,
	IMapper mapper,
	IImageService imageService,
	IScopedIdentityService scopedIdentityService
	) : IHotelReviewsControllerService {

	public async Task CreateAsync(CreateHotelReviewVm vm) {
		var hotelReview = mapper.Map<HotelReview>(vm);

		hotelReview.UserId = scopedIdentityService.GetRequiredUserId();

		hotelReview.Photos = await SaveAndPrioritizePhotosAsync(vm.Photos, hotelReview);

		context.HotelReviews.Add(hotelReview);

		try {
			await context.SaveChangesAsync();
		}
		catch {
			imageService.DeleteImagesIfExists(hotelReview.Photos.Select(p => p.Name).ToArray());
			throw;
		}
	}

	public async Task UpdateAsync(UpdateHotelReviewVm vm) {
		HotelReview hotelReview = await context.HotelReviews
			.Include(hr => hr.Photos)
			.FirstAsync(hr => hr.Id == vm.Id);

		var oldPhotos = hotelReview.Photos
			.Select(p => p.Name)
			.ToArray();

		hotelReview.Description = vm.Description;
		hotelReview.Score = vm.Score;
		hotelReview.Photos.Clear();
		foreach (var photo in await SaveAndPrioritizePhotosAsync(vm.Photos, hotelReview))
			hotelReview.Photos.Add(photo);

		try {
			await context.SaveChangesAsync();

			imageService.DeleteImagesIfExists(oldPhotos);
		}
		catch {
			imageService.DeleteImagesIfExists(hotelReview.Photos.Select(p => p.Name).ToArray());
			throw;
		}
	}

	public async Task DeleteIfExistsAsync(long id) {
		var hotelReview = await context.HotelReviews
			.Include(hr => hr.Photos)
			.FirstOrDefaultAsync(hr => hr.Id == id && hr.UserId == scopedIdentityService.GetRequiredUserId());

		if (hotelReview is null)
			return;

		context.HotelReviews.Remove(hotelReview);
		await context.SaveChangesAsync();

		imageService.DeleteImagesIfExists(hotelReview.Photos.Select(p => p.Name).ToArray());
	}



	private async Task<ICollection<HotelReviewPhoto>> SaveAndPrioritizePhotosAsync(IEnumerable<IFormFile>? photos, HotelReview hotelReview) {
		if (photos is null)
			return [];

		var images = await imageService.SaveImagesAsync(photos);

		int index = 0;
		return images
			.Select(i => new HotelReviewPhoto {
				HotelReview = hotelReview,
				Name = i,
				Priority = index++
			})
			.ToArray();
	}
}
