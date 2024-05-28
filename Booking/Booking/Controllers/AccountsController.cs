using Booking.Exceptions;
using Booking.Services.ControllerServices.Interfaces;
using Booking.Services.Interfaces;
using Booking.ViewModels.Account;
using FluentValidation;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Model.Entities.Identity;

namespace Booking.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AccountsController(
	UserManager<User> userManager,
	IJwtTokenService jwtTokenService,
	IValidator<RegisterVm> registerValidator,
	IAccountsControllerService service
	) : ControllerBase {

	[HttpPost]
	public async Task<IActionResult> SignIn([FromForm] SignInVm model) {
		User? user = await userManager.FindByEmailAsync(model.Email);

		if (user is null || !await userManager.CheckPasswordAsync(user, model.Password))
			return Unauthorized("Wrong authentication data");

		return Ok(new JwtTokenResponse {
			Token = await jwtTokenService.CreateTokenAsync(user)
		});
	}

	[HttpPost]
	public async Task<IActionResult> Registration([FromForm] RegisterVm vm) {
		var validationResult = await registerValidator.ValidateAsync(vm);

		if (!validationResult.IsValid)
			return BadRequest(validationResult.Errors);

		try {
			var user = await service.SignUpAsync(vm);

			return Ok(new JwtTokenResponse {
				Token = await jwtTokenService.CreateTokenAsync(user)
			});
		}
		catch (IdentityException e) {
			return StatusCode(500, e.IdentityResult.Errors);
		}
	}

	[HttpPost]
	public async Task<IActionResult> GoogleSignIn([FromForm] GoogleSignInVm model) {
		try {
			User user = await service.GoogleSignInAsync(model);

			return Ok(new JwtTokenResponse {
				Token = await jwtTokenService.CreateTokenAsync(user)
			});
		}
		catch (InvalidJwtException e) {
			return Unauthorized(e.Message);
		}
		catch (IdentityException e) {
			return StatusCode(500, e.IdentityResult.Errors);
		}
	}
}
