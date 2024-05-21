using Booking.Services.Interfaces;
using Booking.ViewModels.HotelPhoto;
using FluentValidation;

namespace Booking.Validators.HotelPhoto
{
    public class CreateHotelPhotoValidator : AbstractValidator<CreateHotelPhotoVm>
    {
        public CreateHotelPhotoValidator(IImageValidator imageValidator)
        {
            RuleFor(p => p.Image)
                .NotNull()
                    .WithMessage("Image is not selected")
                .MustAsync(imageValidator.IsValidImageAsync)
                    .WithMessage("Image is not valid");

            RuleFor(p => p.Priority)
                .GreaterThanOrEqualTo(0)
                    .WithMessage("Priority must be greater than or equal to 0");
        }
    }
}
