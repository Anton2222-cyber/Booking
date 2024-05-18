using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Model.Entities;

namespace Model.EntityTypeConfigurations;

internal class CityEntityTypeConfiguration : IEntityTypeConfiguration<City> {
	public void Configure(EntityTypeBuilder<City> builder) {
		builder.ToTable("Cities");

		builder.Property(c => c.Name)
			.HasMaxLength(255)
			.IsRequired();

		builder.Property(c => c.Image)
			.HasMaxLength(255)
			.IsRequired();
	}
}