using Booking.Services.Interfaces;
using Booking.ViewModels.Booking;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Validators.Booking;

public class CreateBookingValidator : AbstractValidator<CreateBookingVm> {
	private readonly DataContext _context;

	public CreateBookingValidator(DataContext context, IExistingEntityCheckerService existingEntityCheckerService) {
		_context = context;

		RuleFor(b => b.From)
			.GreaterThan(DateTime.Now)
				.WithMessage("Reservations are only possible for the future");

		RuleFor(b => b.From)
			.LessThan(b => b.To)
				.WithMessage("Invalid time span");

		RuleFor(b => b.RoomId)
			.MustAsync(existingEntityCheckerService.IsCorrectRoomId)
				.WithMessage("Room with this Id is not exists");

		RuleFor(b => b)
			.MustAsync(ThereAreNoTimeCrossings)
				.WithMessage("There is already a booking that overlaps with this time slot");
	}

	private async Task<bool> ThereAreNoTimeCrossings(CreateBookingVm vm, CancellationToken cancellationToken) {
		return await _context.Bookings
			.Where(b => b.RoomId == vm.RoomId)
			.AllAsync(
				b => (b.From < vm.From && b.To <= vm.From)
					|| (b.From >= vm.To && b.To > vm.To)
			);
	}
}