using AutoMapper;
using Booking.Services.Interfaces;
using Booking.ViewModels.Country;
using Microsoft.EntityFrameworkCore;
using Model.Context;
using Model.Entities;

namespace Booking.Services;

public class CountriesControllerService(
	DataContext context,
	IMapper mapper,
	IImageService imageService
	) : ICountriesControllerService {

	public async Task<Country> CreateAsync(CreateCountryVm vm) {
		var country = mapper.Map<Country>(vm);
		country.Image = await imageService.SaveImageAsync(vm.Image);

		try {
			await context.Countries.AddAsync(country);
			await context.SaveChangesAsync();
		}
		catch (Exception) {
			imageService.DeleteImageIfExists(country.Image);
			throw;
		}

		return country;
	}

	public async Task<Country> UpdateAsync(UpdateCountryVm vm) {
		Country country = await context.Countries.FirstAsync(c => c.Id == vm.Id);

		string oldImage = country.Image;

		try {
			country.Name = vm.Name;
			country.Image = await imageService.SaveImageAsync(vm.Image);

			await context.SaveChangesAsync();

			imageService.DeleteImageIfExists(oldImage);
		}
		catch (Exception) {
			imageService.DeleteImageIfExists(country.Image);
			throw;
		}

		return country;
	}

	public async Task DeleteIfExistsAsync(long id) {
		var country = await context.Countries.FirstAsync(c => c.Id == id);

		if (country is null)
			return;

		context.Countries.Remove(country);
		await context.SaveChangesAsync();

		imageService.DeleteImageIfExists(country.Image);
	}
}
