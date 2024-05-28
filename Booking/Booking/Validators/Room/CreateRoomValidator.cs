using Booking.Services.Interfaces;
using Booking.ViewModels.Room;
using FluentValidation;

namespace Booking.Validators.Room;

public class CreateRoomValidator : AbstractValidator<CreateRoomVm> {
	public CreateRoomValidator(IImageValidator imageValidator, IExistingEntityCheckerService existingEntityCheckerService) {
		RuleFor(r => r.Name)
			.NotEmpty()
				.WithMessage("Name is empty or null")
			.MaximumLength(255)
				.WithMessage("Name is too long");

		RuleFor(r => r.Price)
			.GreaterThanOrEqualTo(0)
				.WithMessage("Price cannot be negative");

		RuleFor(r => r.AdultPlaces)
			.GreaterThanOrEqualTo(0)
				.WithMessage("Number of adult places cannot be negative");

		RuleFor(r => r.ChildrenPlaces)
			.GreaterThanOrEqualTo(0)
				.WithMessage("Number of children places cannot be negative");

		RuleFor(r => r.HotelId)
			.MustAsync(existingEntityCheckerService.IsCorrectHotelId)
				.WithMessage("Hotel with this id is not exists");

		RuleFor(r => r.Photos)
			.MustAsync(imageValidator.IsValidImagesAsync)
				.WithMessage("One ore more of photos are invalid");

		RuleFor(r => r.ConvenienceIds)
			.MustAsync(existingEntityCheckerService.IsCorrectConvenienceIds)
				.WithMessage("ConvenienceIds contains the Id of a non-existing element");
	}
}
