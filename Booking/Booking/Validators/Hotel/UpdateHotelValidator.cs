using Booking.Services;
using Booking.Services.Interfaces;
using Booking.ViewModels.Address;
using Booking.ViewModels.Hotel;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Validators.Hotel;

public class UpdateHotelValidator : AbstractValidator<UpdateHotelVm> {
	public UpdateHotelValidator(IExistingEntityCheckerService existingEntityCheckerService, IImageValidator imageValidator,
		IValidator<UpdateAddressVm> addressValidator, IScopedIdentityService scopedIdentityService, DataContext context) {

		RuleFor(h => h.Id)
			.MustAsync(existingEntityCheckerService.IsCorrectHotelId)
				.WithMessage("Hotel with this id is not exists");

		RuleFor(h => h)
			.MustAsync(async (hVm, cancellationToken) =>
				await context.Hotels.AnyAsync(h => h.Id == hVm.Id && h.UserId == scopedIdentityService.GetRequiredUser().Id, cancellationToken: cancellationToken)
			)
				.WithMessage("This is someone else's hotel");

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
			.SetValidator(addressValidator);

		RuleFor(h => h.TypeId)
			.MustAsync(existingEntityCheckerService.IsCorrectHotelTypeId)
				.WithMessage("HotelType with this id is not exists");

		RuleFor(h => h.Photos)
			.MustAsync(imageValidator.IsValidImagesAsync)
				.WithMessage("One ore more of photos are invalid");
	}
}
