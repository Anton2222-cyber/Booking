using Booking.Services.Interfaces;
using Booking.ViewModels.HotelReview;
using FluentValidation;

namespace Booking.Validators.HotelReview;

public class UpdateHotelReviewValidator : AbstractValidator<UpdateHotelReviewVm> {
	public UpdateHotelReviewValidator(IExistingEntityCheckerService existingEntityCheckerService, IImageValidator imageValidator) {
		RuleFor(hr => hr.Id)
			.MustAsync(existingEntityCheckerService.IsCorrectHotelReviewId)
				.WithMessage("Hotel review with this id is not exists");

		RuleFor(hr => hr.Description)
			.NotEmpty()
				.WithMessage("Description is empty or null")
			.MaximumLength(2000)
				.WithMessage("Description is too long (2000)");

		RuleFor(hr => hr.Score)
			.InclusiveBetween(0, 10)
				.WithMessage("Score must be in the range from 0 to 10");

		RuleFor(hr => hr.Photos)
			.MustAsync(imageValidator.IsValidNullPossibeImagesAsync)
				.WithMessage("One ore more of photos are invalid");
	}
}
