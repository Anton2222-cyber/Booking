using AutoMapper;
using Booking.Services.ControllerServices.Interfaces;
using Booking.Services.Interfaces;
using Booking.ViewModels.Country;
using Microsoft.EntityFrameworkCore;
using Model.Context;
using Model.Entities;

namespace Booking.Services.ControllerServices;

public class CountriesControllerService(
    DataContext context,
    IMapper mapper,
    IImageService imageService
    ) : ICountriesControllerService
{

    public async Task CreateAsync(CreateCountryVm vm)
    {
        var country = mapper.Map<Country>(vm);
        country.Image = await imageService.SaveImageAsync(vm.Image);

        await context.Countries.AddAsync(country);

        try
        {
            await context.SaveChangesAsync();
        }
        catch (Exception)
        {
            imageService.DeleteImageIfExists(country.Image);
            throw;
        }
    }

    public async Task UpdateAsync(UpdateCountryVm vm)
    {
        Country country = await context.Countries.FirstAsync(c => c.Id == vm.Id);

        string oldImage = country.Image;

        country.Name = vm.Name;
        country.Image = await imageService.SaveImageAsync(vm.Image);

        try
        {
            await context.SaveChangesAsync();

            imageService.DeleteImageIfExists(oldImage);
        }
        catch (Exception)
        {
            imageService.DeleteImageIfExists(country.Image);
            throw;
        }
    }

    public async Task DeleteIfExistsAsync(long id)
    {
        var country = await context.Countries.FirstOrDefaultAsync(c => c.Id == id);

        if (country is null)
            return;

        context.Countries.Remove(country);
        await context.SaveChangesAsync();

        imageService.DeleteImageIfExists(country.Image);
    }
}
