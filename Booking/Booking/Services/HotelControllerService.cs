using AutoMapper;
using Booking.Services.Interfaces;
using Booking.ViewModels.Hotel;
using Microsoft.EntityFrameworkCore;
using Model.Context;
using Model.Entities;

namespace Booking.Services
{
    public class HotelControllerService(
        DataContext context,
        IMapper mapper,
	    IImageService imageService
	    ) : IHotelControllerService {

        public async Task CreateAsync(CreateHotelVm vm)
        {
            using var transaction = await context.Database.BeginTransactionAsync();

            try
            {
                var hotel = mapper.Map<Hotel>(vm);

                var address = mapper.Map<Address>(vm.Address);

                var city = context.Cities.FirstOrDefault(c => c.Id == address.CityId);
                if (city == null)
                {
                    throw new Exception($"City with ID {address.CityId} not found.");
                }
                address.City = city.Name;

                context.Addresses.Add(address);
                await context.SaveChangesAsync();

                hotel.Address = address;

                context.Hotels.Add(hotel);
                await context.SaveChangesAsync();

                await transaction.CommitAsync();
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();

                throw;
            }
        }

        public async Task UpdateAsync(UpdateHotelVm vm)
        {
            using var transaction = await context.Database.BeginTransactionAsync();

            try
            {
                var existingHotel = await context.Hotels
                    .Include(c => c.Address)
                    .FirstOrDefaultAsync(h => h.Id == vm.Id);

                if (existingHotel == null)
                {
                    throw new Exception($"Hotel with ID {vm.Id} not found.");
                }

                var hotel = mapper.Map<Hotel>(vm);

                var updatedAddress = new Address
                {
                    Street = vm.Street,
                    CityId = vm.CityId,
                    HouseNumber = vm.HouseNumber
                };

                var city = context.Cities.FirstOrDefault(c => c.Id == updatedAddress.CityId);
                if (city == null)
                {
                    throw new Exception($"City with ID {updatedAddress.CityId} not found.");
                }
                updatedAddress.City = city.Name;

                if (existingHotel != null)
                {
                    context.Addresses.Remove(existingHotel.Address);

                    context.Addresses.Add(updatedAddress);

                    existingHotel.Address = updatedAddress;
                    existingHotel.Name = hotel.Name;
                    existingHotel.Description = hotel.Description;
                    existingHotel.Rating = hotel.Rating;

                    context.Update(existingHotel);
                    await context.SaveChangesAsync();
                }

                await transaction.CommitAsync();
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task DeleteIfExistsAsync(long id)
        {
            var hotel = await context.Hotels.FirstOrDefaultAsync(c => c.Id == id);

            if (hotel is null)
                return;

            context.Hotels.Remove(hotel);
            await context.SaveChangesAsync();

            var images = context.HotelPhotos.Where(c => c.HotelId == hotel.Id).ToList();
            foreach(var image in images)
            {
                imageService.DeleteImageIfExists(image.Name);
            }
        }
    }
}
