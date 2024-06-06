using Booking.ViewModels.HotelType;
using FluentValidation;

namespace Booking.Validators.HotelType;

public class CreateHotelTypeValidator : AbstractValidator<CreateHotelTypeVm> {
	public CreateHotelTypeValidator() {
		RuleFor(ht => ht.Name)
			.NotEmpty()
				.WithMessage("Name is empty or null")
			.MaximumLength(255)
				.WithMessage("Name is too long");
	}
}
