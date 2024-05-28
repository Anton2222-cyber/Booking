using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Model.Entities;

namespace Model.EntityTypeConfigurations;

internal class BookingEntityTypeConfiguration : IEntityTypeConfiguration<Booking> {
	public void Configure(EntityTypeBuilder<Booking> builder) {
		builder.ToTable("Bookings");
	}
}
