using Booking.Services.Interfaces;
using Booking.Validators.Address;
using Booking.ViewModels.Hotel;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Validators.Hotel;

public class UpdateHotelValidator : AbstractValidator<UpdateHotelVm> {
	private readonly DataContext _context;

	public UpdateHotelValidator(DataContext context, IImageValidator imageValidator) {
		_context = context;

		RuleFor(c => c.Id)
			.MustAsync(IsCorrectId)
				.WithMessage("Hotel with this id is not exists");

		RuleFor(c => c.Name)
			.NotEmpty()
				.WithMessage("Name is empty or null")
			.MaximumLength(255)
				.WithMessage("Name is too long");

		RuleFor(c => c.Description)
			.NotEmpty()
				.WithMessage("Description is empty or null")
			.MaximumLength(4000)
				.WithMessage("Description is too long (4000)");

		RuleFor(h => h.Address)
			.SetValidator(new UpdateAddressValidator(context));

		RuleFor(h => h.Photos)
			.MustAsync(imageValidator.IsValidImagesAsync)
				.WithMessage("One ore more of photos are invalid");
	}

	private async Task<bool> IsCorrectId(long id, CancellationToken token) {
		return await _context.Hotels.AnyAsync(c => c.Id == id, token);
	}
}
