using Booking.Services.Interfaces;
using Booking.ViewModels.HotelPhoto;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Validators.HotelPhoto
{
    public class CreateHotelPhotoValidator : AbstractValidator<CreateHotelPhotoVm>
    {
        private readonly DataContext _context;

        public CreateHotelPhotoValidator(DataContext context, IImageValidator imageValidator)
        {
            _context = context;

            RuleFor(p => p.Image)
                .NotNull()
                    .WithMessage("Image is not selected")
                .MustAsync(imageValidator.IsValidImageAsync)
                    .WithMessage("Image is not valid");

            RuleFor(p => p.Priority)
                .GreaterThanOrEqualTo(0)
                    .WithMessage("Priority must be greater than or equal to 0");

            RuleFor(c => c.HotelId)
                .MustAsync(IsCorrectHotelId)
                    .WithMessage("Hotel with this id is not exists");
        }

        private async Task<bool> IsCorrectHotelId(long id, CancellationToken token)
        {
            return await _context.Hotels.AnyAsync(c => c.Id == id, token);
        }
    }
}
