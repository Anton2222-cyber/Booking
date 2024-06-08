using Booking.Services;
using Booking.Services.Interfaces;
using Booking.ViewModels.FavoriteHotel;
using FluentValidation;

namespace Booking.Validators.FavoriteHotel;

public class CreateFavoriteHotelValidator : AbstractValidator<CreateFavoriteHotelVm> {
	public CreateFavoriteHotelValidator(IExistingEntityCheckerService existingEntityCheckerService, IScopedIdentityService scopedIdentityService) {
		RuleFor(fh => fh.HotelId)
			.MustAsync(existingEntityCheckerService.IsCorrectHotelId)
				.WithMessage("Hotel with this id is not exists");

		RuleFor(fh => fh)
			.MustAsync(async (fh, cancellationToken) => !await existingEntityCheckerService.IsCorrectFavoriteHotelKey(fh.HotelId, scopedIdentityService.GetRequiredUser().Id, cancellationToken))
				.WithMessage("The hotel is already a favorite");
	}
}