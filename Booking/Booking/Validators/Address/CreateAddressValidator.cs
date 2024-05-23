using Booking.ViewModels.Address;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Validators.Address {
	public class CreateAddressValidator : AbstractValidator<CreateAddressVm> {
		private readonly DataContext _context;


		public CreateAddressValidator(DataContext context) {
			_context = context;

			RuleFor(a => a.CityId)
					.MustAsync(IsCorrectAddressCityId)
						.WithMessage("City with this id is not exists");

			RuleFor(a => a.HouseNumber)
					.NotEmpty()
						.WithMessage("House number is empty or null")
					.MaximumLength(255)
						.WithMessage("House number is too long");

			RuleFor(a => a.Street)
					.NotEmpty()
						.WithMessage("Street is empty or null")
					.MaximumLength(255)
						.WithMessage("Street is too long");

			RuleFor(a => a.Longitude)
				.InclusiveBetween(-180, 180)
					.WithMessage("Longitude must be between -180 and 180 degrees");

			RuleFor(a => a.Latitude)
				.InclusiveBetween(-90, 90)
					.WithMessage("Latitude must be between -90 and 90 degrees");
		}

		private async Task<bool> IsCorrectAddressCityId(long id, CancellationToken token) {
			return await _context.Cities.AnyAsync(c => c.Id == id, token);
		}
	}
}
