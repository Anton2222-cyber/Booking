using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Model.Entities;

namespace Model.EntityTypeConfigurations;

internal class HotelTypeEntityTypeConfiguration : IEntityTypeConfiguration<HotelType> {
	public void Configure(EntityTypeBuilder<HotelType> builder) {
		builder.ToTable("HotelTypes");

		builder.Property(ht => ht.Name)
			.HasMaxLength(255)
			.IsRequired();
	}
}