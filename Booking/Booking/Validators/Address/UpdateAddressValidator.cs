using Booking.Services.Interfaces;
using Booking.ViewModels.Address;
using Booking.ViewModels.Hotel;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Validators.Address
{
    public class UpdateAddressValidator : AbstractValidator<UpdateAddressVm>
    {
        private readonly DataContext _context;


        public UpdateAddressValidator(DataContext context)
        {
            _context = context;

            RuleFor(c => c.Id)
                .MustAsync(IsCorrectId)
                    .WithMessage("Address with this id is not exists");

            RuleFor(c => c.CityId)
                    .MustAsync(IsCorrectCityId)
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

        private async Task<bool> IsCorrectId(long id, CancellationToken token)
        {
            return await _context.Addresses.AnyAsync(c => c.Id == id, token);
        }

        private async Task<bool> IsCorrectCityId(long id, CancellationToken token)
        {
            return await _context.Cities.AnyAsync(c => c.Id == id, token);
        }
    }
}
