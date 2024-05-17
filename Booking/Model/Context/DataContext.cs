using Microsoft.EntityFrameworkCore;
using Model.Entities;
using Model.EntityTypeConfigurations;

namespace Model.Context;

public class DataContext(DbContextOptions<DataContext> options)
	: DbContext(options) {

	public DbSet<Country> Countries { get; set; }
	public DbSet<City> Cities { get; set; }
	public DbSet<Address> Addresses { get; set; }
	public DbSet<Hotel> Hotels { get; set; }
	public DbSet<HotelPhoto> HotelPhotos { get; set; }

	protected override void OnModelCreating(ModelBuilder modelBuilder) {
		base.OnModelCreating(modelBuilder);

		new CountryEntityTypeConfiguration().Configure(modelBuilder.Entity<Country>());
		new CityEntityTypeConfiguration().Configure(modelBuilder.Entity<City>());
		new AddressEntityTypeConfiguration().Configure(modelBuilder.Entity<Address>());
		new HotelEntityTypeConfiguration().Configure(modelBuilder.Entity<Hotel>());
		new HotelPhotoEntityTypeConfiguration().Configure(modelBuilder.Entity<HotelPhoto>());
	}
}
