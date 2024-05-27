using Booking.Services.Interfaces;
using Booking.ViewModels.Convenience;
using FluentValidation;

namespace Booking.Validators.Convenience;

public class UpdateConvenienceValidator : AbstractValidator<UpdateConvenienceVm> {
	public UpdateConvenienceValidator(IExistingEntityCheckerService existingEntityCheckerService) {
		RuleFor(c => c.Id)
			.MustAsync(existingEntityCheckerService.IsCorrectConvenienceId)
				.WithMessage("Convenience with this id is not exists");

		RuleFor(c => c.Name)
			.NotEmpty()
				.WithMessage("Name is empty or null")
			.MaximumLength(255)
				.WithMessage("Name is too long");
	}
}