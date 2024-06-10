using Bogus;
using Booking.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Model.Context;
using Model.Entities;

namespace Booking.Services;

public class ProductionDataSeeder(
	DataContext context,
	IImageService imageService,
	IConfiguration configuration
) : IProductionDataSeeder {

	public async Task SeedAsync() {
		if (!await context.Countries.AnyAsync())
			await CreateCountriesAndCitiesAsync();
	}

	private async Task CreateCountriesAndCitiesAsync() {
		var countryCodes = configuration
			.GetSection("ProductionSeed:CountryCodes")
			.Get<string[]>();

		if (countryCodes is null)
			throw new Exception("Configuration ProductionSeed:CountryCodes is invalid");

		foreach (var countryCode in countryCodes)
			await CreateCountryByCodeAsync(countryCode);
	}

	private async Task CreateCountryByCodeAsync(string countryCode) {
		Faker faker = new Faker();

		var citiesResponce = await GetCitiesFromGeonamesAsync(countryCode);

		using var httpClient = new HttpClient();
		var imageUrl = faker.Image.LoremFlickrUrl(keywords: "city");

		Country country = new Country {
			Name = citiesResponce.First().CountryName,
			Image = await imageService.SaveImageAsync(await GetImageAsBase64Async(httpClient, imageUrl))
		};

		country.Cities = citiesResponce.Select(c => new City {
			Name = c.Name,
			Latitude = c.Lat,
			Longitude = c.Lng
		}).ToArray();

		foreach (var city in country.Cities) {
			imageUrl = faker.Image.LoremFlickrUrl(keywords: "city");

			city.Image = await imageService.SaveImageAsync(await GetImageAsBase64Async(httpClient, imageUrl));
		}

		await context.Countries.AddAsync(country);
		await context.SaveChangesAsync();
	}

	private async Task<List<Geoname>> GetCitiesFromGeonamesAsync(string countryCode) {
		const string apiUrl = "http://api.geonames.org";
		const string geonamesUsername = "deadlightdie";

		var count = configuration["ProductionSeed:CitiesCountPerCountry"]
			?? throw new Exception("");

		var geonamesUrl = $"{apiUrl}/searchJSON?country={countryCode}&maxRows={count}&featureClass=P&username={geonamesUsername}";

		using var httpClient = new HttpClient();
		var geonamesResponse = await httpClient.GetFromJsonAsync<GeonamesResponse>(geonamesUrl)
			?? throw new Exception($"Bad request to {apiUrl}");

		return geonamesResponse.Geonames;
	}


	private static async Task<string> GetImageAsBase64Async(HttpClient httpClient, string imageUrl) {
		var imageBytes = await httpClient.GetByteArrayAsync(imageUrl);
		return Convert.ToBase64String(imageBytes);
	}



	class GeonamesResponse {
		public List<Geoname> Geonames { get; set; } = null!;
	}

	class Geoname {
		public string Name { get; set; } = null!;
		public double Lat { get; set; }
		public double Lng { get; set; }
		public string CountryName { get; set; } = null!;
	}
}
