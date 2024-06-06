using Bogus;
using Booking.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Model.Context;
using Model.Entities;

namespace Booking.Services;

public class DataSeeder(
	DataContext context,
	IImageService imageService
) : IDataSeeder {

	public async Task SeedAsync() {
		using var transaction = await context.Database.BeginTransactionAsync();

		try {
			if (!await context.Countries.AnyAsync())
				await CreateCountriesAsync();

			if (!await context.Cities.AnyAsync())
				await CreateCitiesAsync();

			if (!await context.Addresses.AnyAsync())
				await CreateAddressesAsync();

			if (
				!await context.HotelTypes.AnyAsync() ||
				(await context.HotelTypes.CountAsync() == 1 && (await context.HotelTypes.FirstAsync()).Name == "Temporary type")
			)
				await CreateHotelTypesAsync();

			if (!await context.Hotels.AnyAsync())
				await CreateHotelsAsync();

			if (!await context.HotelPhotos.AnyAsync())
				await CreateHotelPhotosAsync();

			if (!await context.HotelReviews.AnyAsync())
				await CreateHotelReviewsAsync();

			if (!await context.HotelReviewPhotos.AnyAsync())
				await CreateHotelReviewPhotosAsync();

			await transaction.CommitAsync();
		}
		catch (Exception) {
			await transaction.RollbackAsync();
			throw;
		}
	}


	private async Task CreateCountriesAsync() {
		Faker faker = new Faker();

		var countryFaker = new Faker<Country>()
			.RuleFor(c => c.Id, f => f.IndexFaker + 1)
			.RuleFor(c => c.Name, f => f.Address.Country());

		var countries = countryFaker.Generate(50);

		using var httpClient = new HttpClient();

		foreach (var country in countries) {
			var imageUrl = faker.Image.LoremFlickrUrl(keywords: "city");
			var imageBase64 = await GetImageAsBase64Async(httpClient, imageUrl);

			country.Image = await imageService.SaveImageAsync(imageBase64);
		}

		var uniqueCountries = countries
		   .GroupBy(c => c.Name)
		   .Select(g => g.First())
		   .ToList();

		context.Countries.AddRange(uniqueCountries);
		context.SaveChanges();
	}


	private async Task CreateCitiesAsync() {
		Faker faker = new Faker();

		var countriesId = context.Countries.Select(c => c.Id).ToList();

		var cityFaker = new Faker<City>()
		.RuleFor(c => c.Name, f => f.Address.City())
		.RuleFor(c => c.Longitude, f => f.Address.Longitude())
		.RuleFor(c => c.Latitude, f => f.Address.Latitude())
		.RuleFor(c => c.CountryId, f => f.PickRandom(countriesId));

		var cities = cityFaker.Generate(50);

		using var httpClient = new HttpClient();

		foreach (var city in cities) {
			var imageUrl = faker.Image.LoremFlickrUrl(keywords: "city");
			var imageBase64 = await GetImageAsBase64Async(httpClient, imageUrl);

			city.Image = await imageService.SaveImageAsync(imageBase64);
		}

		var uniqueCities = cities
			.GroupBy(c => c.Name)
			.Select(g => g.First())
			.ToList();

		context.Cities.AddRange(uniqueCities);
		context.SaveChanges();
	}

	private async Task CreateAddressesAsync() {
		Faker faker = new Faker();
		Random random = new Random();

		var citiesId = await context.Cities.Select(c => c.Id).ToListAsync();

		var addresses = new List<Model.Entities.Address>();

		for (int i = 0; i < 100; i++) {
			var cityId = faker.PickRandom(citiesId);
			var city = context.Cities.Where(c => c.Id == cityId).FirstOrDefault();

			if (city != null) {
				var address = new Address {
					Street = faker.Address.StreetName(),
					HouseNumber = faker.Address.BuildingNumber(),
					CityId = cityId,
					Latitude = city.Latitude + (random.NextDouble() * 0.01 - 0.005),
					Longitude = city.Longitude + (random.NextDouble() * 0.01 - 0.005)
				};

				addresses.Add(address);
			}
		}

		context.Addresses.AddRange(addresses);
		context.SaveChanges();
	}

	private async Task CreateHotelTypesAsync() {
		var faker = new Faker<HotelType>()
			.RuleFor(ht => ht.Name, f => f.Name.Random.Word());

		var hotelTypes = faker.Generate(10).ToArray();

		context.HotelTypes.AddRange(hotelTypes);
		await context.SaveChangesAsync();
	}

	private async Task CreateHotelsAsync() {
		Faker faker = new Faker();
		Random random = new Random();

		var addressesId = await context.Addresses.Select(c => c.Id).ToListAsync();
		var typeIds = await context.HotelTypes.Select(ht => ht.Id).ToArrayAsync();

		var hotels = new List<Hotel>();

		foreach (var address in addressesId) {
			var hotel = new Hotel {
				Name = faker.Company.CompanyName(),
				Description = faker.Lorem.Sentences(5),
				AddressId = address,
				TypeId = faker.PickRandom(typeIds)
			};
			hotels.Add(hotel);
		}

		context.Hotels.AddRange(hotels);
		await context.SaveChangesAsync();
	}

	private async Task CreateHotelPhotosAsync() {
		Faker faker = new Faker();
		Random random = new Random();

		using var httpClient = new HttpClient();

		var hotelsId = await context.Hotels.Select(c => c.Id).ToListAsync();

		foreach (var hotel in hotelsId) {
			var hotelsPhotos = new List<HotelPhoto>();
			var photoCount = random.Next(1, 5);

			for (int i = 0; i < photoCount; i++) {
				var imageUrl = faker.Image.LoremFlickrUrl(keywords: "hotel");
				var imageBase64 = await GetImageAsBase64Async(httpClient, imageUrl);

				var hotelPhoto = new HotelPhoto {
					Name = await imageService.SaveImageAsync(imageBase64),
					Priority = i,
					HotelId = hotel
				};

				hotelsPhotos.Add(hotelPhoto);
			}
			context.HotelPhotos.AddRange(hotelsPhotos);
			context.SaveChanges();
		}
	}

	private async Task CreateHotelReviewsAsync() {
		Faker faker = new Faker();
		Random random = new Random();

		var hotelsId = await context.Hotels.Select(c => c.Id).ToListAsync();
		var usersId = await context.Users.Select(c => c.Id).ToListAsync();

		var reviewFaker = new Faker<HotelReview>()
			.RuleFor(c => c.Description, f => faker.Lorem.Sentences(3))
			.RuleFor(c => c.UserId, f => f.PickRandom(usersId))
			.RuleFor(c => c.HotelId, f => f.PickRandom(hotelsId))
			.RuleFor(c => c.Score, f => f.Random.Int(1, 10));

		var reviews = reviewFaker.Generate(200);

		context.HotelReviews.AddRange(reviews);
		context.SaveChanges();
	}

	private async Task CreateHotelReviewPhotosAsync() {
		Faker faker = new Faker();
		Random random = new Random();

		using var httpClient = new HttpClient();

		var hotelsReviewsId = await context.HotelReviews.Select(c => c.Id).ToListAsync();

		foreach (var review in hotelsReviewsId) {
			var reviewsPhotos = new List<HotelReviewPhoto>();
			var photoCount = random.Next(1, 3);

			for (int i = 0; i < photoCount; i++) {
				var imageUrl = faker.Image.LoremFlickrUrl(keywords: "room");
				var imageBase64 = await GetImageAsBase64Async(httpClient, imageUrl);

				var reviewPhoto = new HotelReviewPhoto {
					Name = await imageService.SaveImageAsync(imageBase64),
					Priority = i,
					HotelReviewId = review
				};

				reviewsPhotos.Add(reviewPhoto);
			}
			context.HotelReviewPhotos.AddRange(reviewsPhotos);
			context.SaveChanges();
		}
	}

	private static async Task<string> GetImageAsBase64Async(HttpClient httpClient, string imageUrl) {
		var imageBytes = await httpClient.GetByteArrayAsync(imageUrl);
		return Convert.ToBase64String(imageBytes);
	}
}