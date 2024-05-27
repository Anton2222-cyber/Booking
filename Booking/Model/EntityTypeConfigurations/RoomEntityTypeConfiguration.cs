using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Model.Entities;

namespace Model.EntityTypeConfigurations;

internal class RoomEntityTypeConfiguration : IEntityTypeConfiguration<Room> {
	public void Configure(EntityTypeBuilder<Room> builder) {
		builder.ToTable("Rooms");

		builder.Property(h => h.Name)
			.HasMaxLength(255)
			.IsRequired();
	}
}
