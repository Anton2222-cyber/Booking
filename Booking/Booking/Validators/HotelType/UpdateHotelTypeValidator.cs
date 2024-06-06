using Booking.Services.Interfaces;
using Booking.ViewModels.HotelType;
using FluentValidation;

namespace Booking.Validators.HotelType;

public class UpdateHotelTypeValidator : AbstractValidator<UpdateHotelTypeVm> {
	public UpdateHotelTypeValidator(IExistingEntityCheckerService existingEntityCheckerService) {
		RuleFor(ht => ht.Id)
			.MustAsync(existingEntityCheckerService.IsCorrectHotelTypeId)
				.WithMessage("HotelType with this id is not exists");

		RuleFor(ht => ht.Name)
			.NotEmpty()
				.WithMessage("Name is empty or null")
			.MaximumLength(255)
				.WithMessage("Name is too long");
	}
}