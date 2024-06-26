﻿using AutoMapper;
using Booking.Services.ControllerServices.Interfaces;
using Booking.Services.Interfaces;
using Booking.ViewModels.City;
using Microsoft.EntityFrameworkCore;
using Model.Context;
using Model.Entities;

namespace Booking.Services.ControllerServices;

public class CitiesControllerService(
    DataContext context,
    IMapper mapper,
    IImageService imageService
    ) : ICitiesControllerService
{

    public async Task CreateAsync(CreateCityVm vm)
    {
        var city = mapper.Map<City>(vm);
        city.Image = await imageService.SaveImageAsync(vm.Image);

        await context.Cities.AddAsync(city);

        try
        {
            await context.SaveChangesAsync();
        }
        catch (Exception)
        {
            imageService.DeleteImageIfExists(city.Image);
            throw;
        }
    }

    public async Task UpdateAsync(UpdateCityVm vm)
    {
        City city = await context.Cities.FirstAsync(c => c.Id == vm.Id);

        string oldImage = city.Image;

        city.Name = vm.Name;
        city.Image = await imageService.SaveImageAsync(vm.Image);
        city.Latitude = vm.Latitude;
        city.Longitude = vm.Longitude;
        city.CountryId = vm.CountryId;

        try
        {
            await context.SaveChangesAsync();

            imageService.DeleteImageIfExists(oldImage);
        }
        catch
        {
            imageService.DeleteImageIfExists(city.Image);
            throw;
        }
    }

    public async Task DeleteIfExistsAsync(long id)
    {
        var city = await context.Cities.FirstOrDefaultAsync(c => c.Id == id);

        if (city is null)
            return;

        context.Cities.Remove(city);
        await context.SaveChangesAsync();

        imageService.DeleteImageIfExists(city.Image);
    }
}
