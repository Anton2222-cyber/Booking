using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Model.Entities;
using Model.Entities.Identity;
using Model.EntityTypeConfigurations;
using Model.EntityTypeConfigurations.Identity;

namespace Model.Context;

public class DataContext(DbContextOptions<DataContext> options)
	: IdentityDbContext<User, Role, long, IdentityUserClaim<long>, UserRole, IdentityUserLogin<long>,
		IdentityRoleClaim<long>, IdentityUserToken<long>>(options) {

	public DbSet<Country> Countries { get; set; }
	public DbSet<City> Cities { get; set; }
	public DbSet<Address> Addresses { get; set; }
	public DbSet<Hotel> Hotels { get; set; }
	public DbSet<HotelPhoto> HotelPhotos { get; set; }
	public DbSet<HotelReview> HotelReviews { get; set; }
	public DbSet<HotelReviewPhoto> HotelReviewPhotos { get; set; }
	public DbSet<Room> Rooms { get; set; }
	public DbSet<RoomPhoto> RoomPhotos { get; set; }
	public DbSet<Convenience> Conveniences { get; set; }
	public DbSet<RoomConvenience> RoomConveniences { get; set; }
	public DbSet<Booking> Bookings { get; set; }

	protected override void OnModelCreating(ModelBuilder modelBuilder) {
		base.OnModelCreating(modelBuilder);

		new UserEntityTypeConfiguration().Configure(modelBuilder.Entity<User>());
		new UserRoleEntityTypeConfiguration().Configure(modelBuilder.Entity<UserRole>());

		new CountryEntityTypeConfiguration().Configure(modelBuilder.Entity<Country>());
		new CityEntityTypeConfiguration().Configure(modelBuilder.Entity<City>());
		new AddressEntityTypeConfiguration().Configure(modelBuilder.Entity<Address>());
		new HotelEntityTypeConfiguration().Configure(modelBuilder.Entity<Hotel>());
		new HotelPhotoEntityTypeConfiguration().Configure(modelBuilder.Entity<HotelPhoto>());
		new HotelReviewEntityTypeConfiguration().Configure(modelBuilder.Entity<HotelReview>());
		new HotelReviewPhotoEntityTypeConfiguration().Configure(modelBuilder.Entity<HotelReviewPhoto>());
		new RoomEntityTypeConfiguration().Configure(modelBuilder.Entity<Room>());
		new RoomPhotoEntityTypeConfiguration().Configure(modelBuilder.Entity<RoomPhoto>());
		new ConvenienceEntityTypeConfiguration().Configure(modelBuilder.Entity<Convenience>());
		new RoomConvenienceEntityTypeConfiguration().Configure(modelBuilder.Entity<RoomConvenience>());
		new BookingEntityTypeConfiguration().Configure(modelBuilder.Entity<Booking>());
	}
}
