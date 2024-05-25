using Booking.ViewModels.Convenience;
using FluentValidation;

namespace Booking.Validators.Convenience;

public class CreateConvenienceValidator : AbstractValidator<CreateConvenienceVm> {
	public CreateConvenienceValidator() {
		RuleFor(c => c.Name)
			.NotEmpty().WithMessage("Name is empty or null")
			.MaximumLength(255).WithMessage("Name is too long");
	}
}