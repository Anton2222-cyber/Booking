using Booking.Services.Interfaces;
using Booking.ViewModels.Booking;
using FluentValidation;

namespace Booking.Validators.Booking {
	public class CreateBookingValidator : AbstractValidator<CreateBookingVm> {
		public CreateBookingValidator(IExistingEntityCheckerService existingEntityCheckerService) {
			RuleFor(b => b.From)
				.GreaterThan(DateTime.Now)
					.WithMessage("Reservations are only possible for the future");

			RuleFor(b => b.From)
				.LessThan(b => b.To)
					.WithMessage("Invalid time span");

			RuleFor(b => b.RoomId)
				.MustAsync(existingEntityCheckerService.IsCorrectRoomId)
					.WithMessage("Room with this Id is not exists");
		}
	}
}
