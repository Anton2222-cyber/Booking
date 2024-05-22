using Booking.Services.Interfaces;
using Booking.ViewModels.Account;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Model.Entities.Identity;

namespace Booking.Validators.Account;

public class RegisterValidator : AbstractValidator<RegisterVm> {
	private readonly UserManager<User> _userManager;

	public RegisterValidator(UserManager<User> userManager, IImageValidator imageValidator) {
		_userManager = userManager;

		RuleFor(r => r.Email)
			.NotEmpty()
				.WithMessage("Email is empty or null")
			.MaximumLength(100)
				.WithMessage("Email is too long")
			.EmailAddress()
				.WithMessage("Email is invalid")
			.MustAsync(IsNewEmail)
				.WithMessage("There is already a user with this email");

		RuleFor(r => r.UserName)
			.NotEmpty()
				.WithMessage("Username is empty or null")
			.MaximumLength(100)
				.WithMessage("Username is too long")
			.MustAsync(IsNewUserName)
				.WithMessage("There is already a user with this username");

		RuleFor(r => r.FirstName)
			.NotEmpty()
				.WithMessage("FirstName is empty or null")
			.MaximumLength(100)
				.WithMessage("FirstName is too long");

		RuleFor(r => r.LastName)
			.NotEmpty()
				.WithMessage("LastName is empty or null")
			.MaximumLength(100)
				.WithMessage("LastName is too long");

		RuleFor(r => r.Image)
			.NotNull()
				.WithMessage("Image is not selected")
			.MustAsync(imageValidator.IsValidImageAsync)
				.WithMessage("Image is not valid");
	}

	private async Task<bool> IsNewEmail(string email, CancellationToken _) {
		return await _userManager.FindByEmailAsync(email) is null;
	}

	private async Task<bool> IsNewUserName(string userName, CancellationToken _) {
		return await _userManager.FindByNameAsync(userName) is null;
	}
}
