using Booking.Services.Interfaces;
using Booking.Validators.Address;
using Booking.Validators.HotelPhoto;
using Booking.ViewModels.Hotel;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Validators.Hotel
{
    public class CreateHotelValidator : AbstractValidator<CreateHotelVm>
    {
        private readonly DataContext _context;

        public CreateHotelValidator(DataContext context)
        {
            _context = context;

            RuleFor(c => c.Address).SetValidator(new CreateAddressValidator(_context));

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
        }
    }
}
