using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Model.Entities;

namespace Model.EntityTypeConfigurations;

internal class AddressEntityTypeConfiguration : IEntityTypeConfiguration<Address> {
	public void Configure(EntityTypeBuilder<Address> builder) {
		builder.ToTable("Addresses");

		builder.Property(a => a.Street)
			.HasMaxLength(255)
			.IsRequired();

		builder.Property(a => a.HouseNumber)
			.HasMaxLength(20)
			.IsRequired();
	}
}