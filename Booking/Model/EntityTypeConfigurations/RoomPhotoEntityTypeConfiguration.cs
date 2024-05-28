using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Model.Entities;

namespace Model.EntityTypeConfigurations;

internal class RoomPhotoEntityTypeConfiguration : IEntityTypeConfiguration<RoomPhoto> {
	public void Configure(EntityTypeBuilder<RoomPhoto> builder) {
		builder.ToTable("RoomPhotos");

		builder.Property(rp => rp.Name)
			.HasMaxLength(255)
			.IsRequired();
	}
}
