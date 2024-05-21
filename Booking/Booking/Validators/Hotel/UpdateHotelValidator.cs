using Booking.Services.Interfaces;
using Booking.Validators.Address;
using Booking.Validators.HotelPhoto;
using Booking.ViewModels.Hotel;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Validators.Hotel
{
    public class UpdateHotelValidator : AbstractValidator<UpdateHotelVm>
    {
        private readonly DataContext _context;

        public UpdateHotelValidator(DataContext context)
        {
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

            RuleFor(c => c.Rating)
                .InclusiveBetween(0, 5)
                    .WithMessage("Rating must be between 0 and 5 degrees");

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
            return await _context.Hotels.AnyAsync(c => c.Id == id, token);
        }

        private async Task<bool> IsCorrectCityId(long id, CancellationToken token)
        {
            return await _context.Cities.AnyAsync(c => c.Id == id, token);
        }
    }
}
