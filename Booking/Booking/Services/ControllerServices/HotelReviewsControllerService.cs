using AutoMapper;
using Booking.Services.ControllerServices.Interfaces;
using Booking.Services.Interfaces;
using Booking.ViewModels.HotelReview;
using Microsoft.EntityFrameworkCore;
using Model.Context;
using Model.Entities;
using Model.Entities.Identity;

namespace Booking.Services.ControllerServices;

public class HotelReviewsControllerService(
	DataContext context,
	IMapper mapper,
	IImageService imageService
	) : IHotelReviewsControllerService {

	public async Task CreateAsync(CreateHotelReviewVm vm, User user) {
		var hotelReview = mapper.Map<HotelReview>(vm);

		hotelReview.UserId = user.Id;

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
		hotelReview.HotelId = vm.HotelId;
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
			.FirstOrDefaultAsync(hr => hr.Id == id);

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
