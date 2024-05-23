using Booking.Services.Interfaces;
using Booking.Validators.Address;
using Booking.ViewModels.Hotel;
using FluentValidation;
using Model.Context;

namespace Booking.Validators.Hotel;

public class CreateHotelValidator : AbstractValidator<CreateHotelVm> {
	private readonly DataContext _context;

	public CreateHotelValidator(DataContext context, IImageValidator imageValidator) {
		_context = context;

		RuleFor(h => h.Name)
			.NotEmpty()
				.WithMessage("Name is empty or null")
			.MaximumLength(255)
				.WithMessage("Name is too long");

		RuleFor(h => h.Description)
			.NotEmpty()
				.WithMessage("Description is empty or null")
			.MaximumLength(4000)
				.WithMessage("Description is too long (4000)");

		RuleFor(h => h.Address)
			.SetValidator(new CreateAddressValidator(_context));

		RuleFor(h => h.Photos)
			.MustAsync(imageValidator.IsValidImagesAsync)
				.WithMessage("One ore more of photos are invalid");
	}
}
