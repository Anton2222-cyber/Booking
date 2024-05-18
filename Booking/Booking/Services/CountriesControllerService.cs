using AutoMapper;
using Booking.Services.Interfaces;
using Booking.ViewModels.Country;
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
}
