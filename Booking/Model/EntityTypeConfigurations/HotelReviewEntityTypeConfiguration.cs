using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Model.Entities;

namespace Model.EntityTypeConfigurations;

internal class HotelReviewEntityTypeConfiguration : IEntityTypeConfiguration<HotelReview> {
	public void Configure(EntityTypeBuilder<HotelReview> builder) {
		builder.ToTable("HotelReviews");

		builder.Property(hr => hr.Description)
			.HasMaxLength(2000)
			.IsRequired();

		builder.Property(hr => hr.Score)
			.IsRequired(false);
	}
}
