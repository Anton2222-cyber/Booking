using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Model.Entities.Identity;

namespace Model.EntityTypeConfigurations.Identity;

internal class UserEntityTypeConfiguration : IEntityTypeConfiguration<User> {
	public void Configure(EntityTypeBuilder<User> builder) {
		builder.Property(u => u.FirstName)
			.IsRequired()
			.HasMaxLength(100);

		builder.Property(u => u.LastName)
			.IsRequired()
			.HasMaxLength(100);

		builder.Property(u => u.Age)
			.IsRequired();

		builder.Property(u => u.Photo)
			.IsRequired()
			.HasMaxLength(200);
	}
}