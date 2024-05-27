using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Model.Entities;

namespace Model.EntityTypeConfigurations;

internal class RoomConvenienceEntityTypeConfiguration : IEntityTypeConfiguration<RoomConvenience> {
	public void Configure(EntityTypeBuilder<RoomConvenience> builder) {
		builder.ToTable("RoomConveniences");

		builder.HasKey(rc => new {
			rc.RoomId,
			rc.ConvenienceId
		});

		builder.HasOne(rc => rc.Room)
			.WithMany(r => r.Conveniences)
			.HasForeignKey(rc => rc.RoomId)
			.IsRequired();

		builder.HasOne(rc => rc.Convenience)
			.WithMany(c => c.Rooms)
			.HasForeignKey(rc => rc.ConvenienceId)
			.IsRequired();
	}
}