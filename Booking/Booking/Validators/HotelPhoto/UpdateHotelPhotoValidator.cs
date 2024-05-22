using Booking.Services.Interfaces;
using Booking.ViewModels.HotelPhoto;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Validators.HotelPhoto
{
    public class UpdateHotelPhotoValidator : AbstractValidator<UpdateHotelPhotoVm>
    {
        private readonly DataContext _context;

        public UpdateHotelPhotoValidator(DataContext context, IImageValidator imageValidator)
        {
            _context = context;

            RuleFor(p => p.Id)
                .MustAsync(IsCorrectId)
                    .WithMessage("Photo with this id is not exists");

            RuleFor(p => p.Priority)
                .GreaterThanOrEqualTo(0)
                    .WithMessage("Priority must be greater than or equal to 0");
        }

        private async Task<bool> IsCorrectId(long id, CancellationToken token)
        {
            return await _context.HotelPhotos.AnyAsync(c => c.Id == id, token);
        }
    }
}
