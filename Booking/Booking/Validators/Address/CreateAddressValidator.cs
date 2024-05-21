using Booking.Services.Interfaces;
using Booking.ViewModels.Address;
using Booking.ViewModels.Hotel;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Validators.Address
{
    public class CreateAddressValidator : AbstractValidator<CreateAddressVm>
    {
        private readonly DataContext _context;


        public CreateAddressValidator(DataContext context)
        {
            _context = context;

            RuleFor(c => c.CityId)
                    .MustAsync(IsCorrectAddressCityId)
                        .WithMessage("City with this id is not exists");

            RuleFor(c => c.HouseNumber)
                    .NotEmpty()
                        .WithMessage("House number is empty or null")
                    .MaximumLength(255)
                        .WithMessage("House number is too long");

            RuleFor(c => c.Street)
                    .NotEmpty()
                        .WithMessage("Street is empty or null")
                    .MaximumLength(255)
                        .WithMessage("Street is too long");
        }

        private async Task<bool> IsCorrectAddressCityId(long id, CancellationToken token)
        {
            return await _context.Cities.AnyAsync(c => c.Id == id, token);
        }
    }
}
