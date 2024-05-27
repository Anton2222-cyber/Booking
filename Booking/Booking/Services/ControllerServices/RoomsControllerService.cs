using AutoMapper;
using Booking.Services.ControllerServices.Interfaces;
using Booking.Services.Interfaces;
using Booking.ViewModels.Room;
using Microsoft.EntityFrameworkCore;
using Model.Context;
using Model.Entities;

namespace Booking.Services.ControllerServices;

public class RoomsControllerService(
	DataContext context,
	IMapper mapper,
	IImageService imageService
) : IRoomsControllerService {

	public async Task CreateAsync(CreateRoomVm vm) {
		var room = mapper.Map<Room>(vm);

		room.Photos = await SaveAndPrioritizePhotosAsync(vm.Photos, room);

		context.Rooms.Add(room);

		try {
			await context.SaveChangesAsync();
		}
		catch {
			imageService.DeleteImagesIfExists(room.Photos.Select(p => p.Name));

			throw;
		}
	}

	public async Task UpdateAsync(UpdateRoomVm vm) {
		Room room = await context.Rooms
			.Include(r => r.Photos)
			.Include(r => r.Conveniences)
			.FirstAsync(h => h.Id == vm.Id);

		var oldPhotos = room.Photos
			.Select(p => p.Name)
			.ToArray();

		room.Name = vm.Name;
		room.Price = vm.Price;
		room.AdultPlaces = vm.AdultPlaces;
		room.ChildrenPlaces = vm.ChildrenPlaces;
		room.HotelId = vm.HotelId;

		room.Photos.Clear();
		foreach (var photo in await SaveAndPrioritizePhotosAsync(vm.Photos, room))
			room.Photos.Add(photo);

		room.Conveniences.Clear();
		foreach (var convenienceId in vm.ConvenienceIds ?? []) {
			room.Conveniences.Add(new RoomConvenience {
				RoomId = room.Id,
				ConvenienceId = convenienceId
			});
		}

		try {
			await context.SaveChangesAsync();

			imageService.DeleteImagesIfExists(oldPhotos);
		}
		catch {
			imageService.DeleteImagesIfExists(room.Photos.Select(p => p.Name));
			throw;
		}
	}

	public async Task DeleteIfExistsAsync(long id) {
		var room = await context.Rooms
			.Include(r => r.Photos)
			.FirstOrDefaultAsync(r => r.Id == id);

		if (room is null)
			return;

		context.Rooms.Remove(room);
		await context.SaveChangesAsync();

		imageService.DeleteImagesIfExists(room.Photos.Select(p => p.Name));
	}


	private async Task<ICollection<RoomPhoto>>
		SaveAndPrioritizePhotosAsync(IEnumerable<IFormFile> photos, Room room) {
		var images = await imageService.SaveImagesAsync(photos);

		int index = 0;
		return images
			.Select(i => new RoomPhoto {
				Room = room,
				Name = i,
				Priority = index++
			})
			.ToArray();
	}
}