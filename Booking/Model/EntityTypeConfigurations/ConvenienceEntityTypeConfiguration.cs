using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Model.Entities;

namespace Model.EntityTypeConfigurations;

internal class ConvenienceEntityTypeConfiguration : IEntityTypeConfiguration<Convenience> {
	public void Configure(EntityTypeBuilder<Convenience> builder) {
		builder.ToTable("Conveniences");

		builder.Property(c => c.Name)
			.HasMaxLength(255)
			.IsRequired();
	}
}
