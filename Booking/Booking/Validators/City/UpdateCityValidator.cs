using Booking.Services.Interfaces;
using Booking.ViewModels.City;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Validators.City
{
    public class UpdateCityValidator : AbstractValidator<UpdateCityVm>
    {
        private readonly DataContext _context;

        public UpdateCityValidator(DataContext context, IImageValidator imageValidator)
        {
            _context = context;

            RuleFor(c => c.Id)
                .MustAsync(IsCorrectId)
                    .WithMessage("City with this id is not exists");

            RuleFor(c => c.Name)
                .NotEmpty()
                    .WithMessage("Name is empty or null")
                .MaximumLength(255)
                    .WithMessage("Name is too long");

            RuleFor(c => c.Image)
                .NotNull()
                    .WithMessage("Image is not selected")
                .MustAsync(imageValidator.IsValidImageAsync)
                    .WithMessage("Image is not valid");
            
            RuleFor(c => c.Longitude)
                .InclusiveBetween(-180, 180)
                    .WithMessage("Longitude must be between -180 and 180 degrees");

            RuleFor(c => c.Latitude)
                .InclusiveBetween(-90, 90)
                    .WithMessage("Latitude must be between -90 and 90 degrees");

            RuleFor(c => c.CountryId)
                .MustAsync(IsCorrectCountryId)
                    .WithMessage("Country with this id is not exists");
        }

        private async Task<bool> IsCorrectId(long id, CancellationToken token)
        {
            return await _context.Cities.AnyAsync(c => c.Id == id, token);
        }

        private async Task<bool> IsCorrectCountryId(long id, CancellationToken token)
        {
            return await _context.Countries.AnyAsync(c => c.Id == id, token);
        }
    }
}
