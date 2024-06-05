using Booking.Services.Interfaces;
using Booking.ViewModels.Country;
using FluentValidation;

namespace Booking.Validators.Country;

public class UpdateCountryValidator : AbstractValidator<UpdateCountryVm> {
	public UpdateCountryValidator(IExistingEntityCheckerService existingEntityCheckerService, IImageValidator imageValidator) {
		RuleFor(c => c.Id)
			.MustAsync(existingEntityCheckerService.IsCorrectCountryId)
				.WithMessage("Country with this id is not exists");

		RuleFor(c => c.Name)
			.NotEmpty()
				.WithMessage("Name is empty or null")
			.MaximumLength(255)
				.WithMessage("Name is too long");

		RuleFor(c => c.Image)
			.NotNull()
				.WithMessage("Image is not selected")
			.MustAsync(imageValidator.IsValidImageAsync)
				.WithMessage("Image is not valid");
	}
}