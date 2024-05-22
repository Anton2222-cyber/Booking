using AutoMapper;
using Booking.Services.Interfaces;
using Booking.ViewModels.HotelPhoto;
using Microsoft.EntityFrameworkCore;
using Model.Context;
using Model.Entities;

namespace Booking.Services
{
    public class HotelPhotoControllerService(
        DataContext context,
        IMapper mapper,
        IImageService imageService
        ) : IHotelPhotoControllerService {

        public async Task CreateAsync(CreateHotelPhotoVm vm)
        {
            var photo = mapper.Map<HotelPhoto>(vm);
            photo.Name = await imageService.SaveImageAsync(vm.Image);

            await context.HotelPhotos.AddAsync(photo);

            try
            {
                await context.SaveChangesAsync();
            }
            catch (Exception)
            {
                imageService.DeleteImageIfExists(photo.Name);
                throw;
            }
        }

        public async Task UpdateAsync(UpdateHotelPhotoVm vm)
        {
            HotelPhoto photo = await context.HotelPhotos.FirstAsync(c => c.Id == vm.Id);

            photo.Priority = vm.Priority;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task DeleteIfExistsAsync(long id)
        {
            var photo = await context.HotelPhotos.FirstOrDefaultAsync(c => c.Id == id);

            if (photo is null)
                return;

            context.HotelPhotos.Remove(photo);
            await context.SaveChangesAsync();

            imageService.DeleteImageIfExists(photo.Name);
        }
    }
}
