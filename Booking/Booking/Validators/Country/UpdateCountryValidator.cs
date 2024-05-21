using Booking.Services.Interfaces;
using Booking.ViewModels.Country;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Validators.Country;

public class UpdateCountryValidator : AbstractValidator<UpdateCountryVm> {
	private readonly DataContext _context;

	public UpdateCountryValidator(DataContext context, IImageValidator imageValidator) {
		_context = context;

		RuleFor(c => c.Id)
			.MustAsync(IsCorrectId)
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

	private async Task<bool> IsCorrectId(long id, CancellationToken token) {
		return await _context.Countries.AnyAsync(c => c.Id == id, token);
	}
}
