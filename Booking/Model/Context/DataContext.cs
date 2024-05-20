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

	protected override void OnModelCreating(ModelBuilder modelBuilder) {
		base.OnModelCreating(modelBuilder);

		new UserEntityTypeConfiguration().Configure(modelBuilder.Entity<User>());
		new UserRoleEntityTypeConfiguration().Configure(modelBuilder.Entity<UserRole>());

		new CountryEntityTypeConfiguration().Configure(modelBuilder.Entity<Country>());
		new CityEntityTypeConfiguration().Configure(modelBuilder.Entity<City>());
		new AddressEntityTypeConfiguration().Configure(modelBuilder.Entity<Address>());
		new HotelEntityTypeConfiguration().Configure(modelBuilder.Entity<Hotel>());
		new HotelPhotoEntityTypeConfiguration().Configure(modelBuilder.Entity<HotelPhoto>());
	}
}
