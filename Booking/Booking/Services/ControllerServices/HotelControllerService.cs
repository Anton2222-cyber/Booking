﻿using AutoMapper;
using Booking.Services.ControllerServices.Interfaces;
using Booking.Services.Interfaces;
using Booking.ViewModels.Hotel;
using Microsoft.EntityFrameworkCore;
using Model.Context;
using Model.Entities;

namespace Booking.Services.ControllerServices;

public class HotelControllerService(
	DataContext context,
	IMapper mapper,
	IImageService imageService,
	IScopedIdentityService scopedIdentityService
) : IHotelControllerService {

	public async Task CreateAsync(CreateHotelVm vm) {
		var hotel = mapper.Map<Hotel>(vm);

		hotel.Photos = await SaveAndPrioritizePhotosAsync(vm.Photos, hotel);
		hotel.UserId = scopedIdentityService.GetRequiredUser().Id;

		context.Hotels.Add(hotel);

		try {
			await context.SaveChangesAsync();
		}
		catch {
			imageService.DeleteImagesIfExists(hotel.Photos.Select(p => p.Name).ToArray());

			throw;
		}
	}

	public async Task UpdateAsync(UpdateHotelVm vm) {
		Hotel hotel = await context.Hotels
			.Include(h => h.Address)
			.Include(h => h.Photos)
			.FirstAsync(h => h.Id == vm.Id);

		var oldPhotos = hotel.Photos
			.Select(p => p.Name)
			.ToArray();

		hotel.Name = vm.Name;
		hotel.Description = vm.Description;
		hotel.Address.Street = vm.Address.Street;
		hotel.Address.HouseNumber = vm.Address.HouseNumber;
		hotel.Address.Longitude = vm.Address.Longitude;
		hotel.Address.Latitude = vm.Address.Latitude;
		hotel.Address.CityId = vm.Address.CityId;
		hotel.TypeId = vm.TypeId;
		hotel.Photos.Clear();
		foreach (var photo in await SaveAndPrioritizePhotosAsync(vm.Photos, hotel))
			hotel.Photos.Add(photo);

		try {
			await context.SaveChangesAsync();

			imageService.DeleteImagesIfExists(oldPhotos);
		}
		catch {
			imageService.DeleteImagesIfExists(hotel.Photos.Select(p => p.Name).ToArray());
			throw;
		}
	}

	public async Task DeleteIfExistsAsync(long id) {
		var hotel = await context.Hotels
			.Include(h => h.Photos)
			.FirstOrDefaultAsync(c => c.Id == id);

		if (hotel is null)
			return;

		context.Addresses.Remove(new Address() { Id = hotel.AddressId });
		context.Hotels.Remove(hotel);
		await context.SaveChangesAsync();

		imageService.DeleteImagesIfExists(hotel.Photos.Select(p => p.Name).ToArray());
	}


	private async Task<ICollection<HotelPhoto>>
		SaveAndPrioritizePhotosAsync(IEnumerable<IFormFile> photos, Hotel hotel) {
		var images = await imageService.SaveImagesAsync(photos);

		int index = 0;
		return images
			.Select(i => new HotelPhoto {
				Hotel = hotel,
				Name = i,
				Priority = index++
			})
			.ToArray();
	}
}