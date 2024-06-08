using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Model.Entities;

namespace Model.EntityTypeConfigurations;

internal class FavoriteHotelEntityTypeConfiguration : IEntityTypeConfiguration<FavoriteHotel> {
	public void Configure(EntityTypeBuilder<FavoriteHotel> builder) {
		builder.ToTable("FavoriteHotels");

		builder.HasKey(fh => new {
			fh.HotelId,
			fh.UserId
		});
	}
}