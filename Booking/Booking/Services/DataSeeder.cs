using Bogus;
using Booking.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Model.Context;
using Model.Entities;

namespace Booking.Services;

public class DataSeeder(
    DataContext context,
    IImageService imageService
) : IDataSeeder
{

    public async Task SeedAsync()
    {
        using var transaction = await context.Database.BeginTransactionAsync();

        try
        {
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

            if (!await context.Conveniences.AnyAsync())
                await CreateConveniencesAsync();

            if (!await context.Rooms.AnyAsync())
                await CreateRoomsAsync();

            if (!await context.RoomPhotos.AnyAsync())
                await CreateRoomPhotosAsync();

            if (!await context.HotelReviews.AnyAsync())
                await CreateBookingsAndHotelReviewsAsync();

            if (!await context.HotelReviewPhotos.AnyAsync())
                await CreateHotelReviewPhotosAsync();

            await transaction.CommitAsync();
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    private async Task CreateAddressesAsync()
    {
        Faker faker = new Faker();
        Random random = new Random();

        var citiesId = await context.Cities.Select(c => c.Id).ToListAsync();

        var addresses = new List<Model.Entities.Address>();

        for (int i = 0; i < 100; i++)
        {
            var cityId = faker.PickRandom(citiesId);
            var city = context.Cities.Where(c => c.Id == cityId).FirstOrDefault();

            if (city != null)
            {
                var address = new Address
                {
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

    private async Task CreateHotelTypesAsync()
    {
        var faker = new Faker<HotelType>()
            .RuleFor(ht => ht.Name, f => f.Commerce.Department());

        var uniqueNames = new HashSet<string>();
        var hotelTypes = new List<HotelType>();

        while (hotelTypes.Count < 10)
        {
            var newHotelType = faker.Generate();

            if (uniqueNames.Add(newHotelType.Name))
            {
                hotelTypes.Add(newHotelType);
            }
        }

        context.HotelTypes.AddRange(hotelTypes);
        await context.SaveChangesAsync();
    }

    private async Task CreateConveniencesAsync()
    {
        var faker = new Faker<Convenience>()
            .RuleFor(ht => ht.Name, f => f.Commerce.Department());

        var uniqueNames = new HashSet<string>();
        var conveniences = new List<Convenience>();

        while (conveniences.Count < 20)
        {
            var newConvenience = faker.Generate();

            if (uniqueNames.Add(newConvenience.Name))
            {
                conveniences.Add(newConvenience);
            }
        }

        context.Conveniences.AddRange(conveniences);
        await context.SaveChangesAsync();
    }


    private async Task CreateHotelsAsync()
    {
        Faker faker = new Faker();
        Random random = new Random();

        var addressesId = await context.Addresses.Select(c => c.Id).ToListAsync();
        var typeIds = await context.HotelTypes.Select(ht => ht.Id).ToArrayAsync();
        var userIds = await context.Users.Select(u => u.Id).ToArrayAsync();

        var hotels = new List<Hotel>();

        foreach (var address in addressesId)
        {
            var hotel = new Hotel
            {
                Name = faker.Company.CompanyName(),
                Description = faker.Lorem.Sentences(5),
                AddressId = address,
                TypeId = faker.PickRandom(typeIds),
                UserId = faker.PickRandom(userIds)
            };
            hotels.Add(hotel);
        }

        context.Hotels.AddRange(hotels);
        await context.SaveChangesAsync();
    }

    private async Task CreateHotelPhotosAsync()
    {
        Faker faker = new Faker();
        Random random = new Random();

        using var httpClient = new HttpClient();

        var hotelsId = await context.Hotels.Select(c => c.Id).ToListAsync();

        foreach (var hotel in hotelsId)
        {
            var hotelsPhotos = new List<HotelPhoto>();
            var photoCount = random.Next(1, 5);

            for (int i = 0; i < photoCount; i++)
            {
                var imageUrl = faker.Image.LoremFlickrUrl(keywords: "hotel");
                var imageBase64 = await GetImageAsBase64Async(httpClient, imageUrl);

                var hotelPhoto = new HotelPhoto
                {
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

    private async Task CreateRoomsAsync()
    {
        var hotelsId = await context.Hotels.Select(h => h.Id).ToArrayAsync();
        var conveniencesId = await context.Conveniences.Select(c => c.Id).ToArrayAsync();

        var roomFaker = new Faker<Room>()
            .RuleFor(b => b.Name, f => f.Lorem.Sentences(1))
            .RuleFor(b => b.Price, f => f.Random.Int(0, 2000))
            .RuleFor(b => b.AdultPlaces, f => f.Random.Int(0, 10))
            .RuleFor(b => b.ChildrenPlaces, f => f.Random.Int(0, 10))
            .RuleFor(b => b.HotelId, f => f.PickRandom(hotelsId))
            .RuleFor(
                b => b.Conveniences,
                (f, room) => f.PickRandom(conveniencesId, 5)
                    .Select(cId => new RoomConvenience { ConvenienceId = cId, Room = room })
                    .ToArray()
            );

        var rooms = roomFaker.Generate(300);

        await context.Rooms.AddRangeAsync(rooms);
        await context.SaveChangesAsync();
    }

    private async Task CreateRoomPhotosAsync()
    {
        Faker faker = new Faker();
        Random random = new Random();

        using var httpClient = new HttpClient();

        var roomIds = await context.Rooms.Select(r => r.Id).ToListAsync();

        foreach (var roomId in roomIds)
        {
            var roomsPhotos = new List<RoomPhoto>();
            var photoCount = random.Next(1, 5);

            for (int i = 0; i < photoCount; i++)
            {
                var imageUrl = faker.Image.LoremFlickrUrl(keywords: "room");
                var imageBase64 = await GetImageAsBase64Async(httpClient, imageUrl);

                var roomPhoto = new RoomPhoto
                {
                    Name = await imageService.SaveImageAsync(imageBase64),
                    Priority = i,
                    RoomId = roomId
                };

                roomsPhotos.Add(roomPhoto);
            }

            await context.RoomPhotos.AddRangeAsync(roomsPhotos);
            await context.SaveChangesAsync();
        }
    }

    private async Task CreateBookingsAndHotelReviewsAsync()
    {
        var roomsId = await context.Rooms.Select(r => r.Id).ToArrayAsync();
        var usersId = await context.Users.Select(u => u.Id).ToArrayAsync();

        var bookingFaker = new Faker<Model.Entities.Booking>()
            .RuleFor(b => b.From, f => f.Date.Between(DateTime.Now.AddDays(-30), DateTime.Now.AddDays(-20)))
            .RuleFor(b => b.To, f => f.Date.Between(DateTime.Now.AddDays(-15), DateTime.Now.AddDays(-5)))
            .RuleFor(b => b.RoomId, f => f.PickRandom(roomsId))
            .RuleFor(b => b.UserId, f => f.PickRandom(usersId));

        var bookings = bookingFaker.Generate(200);
        await context.Bookings.AddRangeAsync(bookings);
        context.SaveChanges();

        HotelReview[] reviews = bookings.Select(b => CreateHotelReview(b.Id, b.UserId)).ToArray();

        await context.HotelReviews.AddRangeAsync(reviews);
        await context.SaveChangesAsync();
    }

    private HotelReview CreateHotelReview(long bookingId, long userId)
    {
        var reviewFaker = new Faker<HotelReview>()
            .RuleFor(c => c.Description, f => f.Lorem.Sentences(3))
            .RuleFor(c => c.Score, f => f.Random.Int(1, 10))
            .RuleFor(c => c.UserId, f => userId)
            .RuleFor(c => c.BookingId, f => bookingId);

        return reviewFaker.Generate();
    }

    private async Task CreateHotelReviewPhotosAsync()
    {
        Faker faker = new Faker();
        Random random = new Random();

        using var httpClient = new HttpClient();

        var hotelsReviewsId = await context.HotelReviews.Select(c => c.Id).ToListAsync();

        foreach (var review in hotelsReviewsId)
        {
            var reviewsPhotos = new List<HotelReviewPhoto>();
            var photoCount = random.Next(1, 3);

            for (int i = 0; i < photoCount; i++)
            {
                var imageUrl = faker.Image.LoremFlickrUrl(keywords: "room");
                var imageBase64 = await GetImageAsBase64Async(httpClient, imageUrl);

                var reviewPhoto = new HotelReviewPhoto
                {
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


    private static async Task<string> GetImageAsBase64Async(HttpClient httpClient, string imageUrl)
    {
        var imageBytes = await httpClient.GetByteArrayAsync(imageUrl);
        return Convert.ToBase64String(imageBytes);
    }
}
