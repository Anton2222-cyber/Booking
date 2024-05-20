using AutoMapper;
using Booking.Constants;
using Booking.Services;
using Booking.Services.Interfaces;
using Booking.ViewModels.Account;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Model.Entities.Identity;

namespace Booking.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AccountsController(
	UserManager<User> userManager,
	IJwtTokenService jwtTokenService,
	IMapper mapper,
	ImageService imageService,
	IConfiguration configuration,
	IValidator<RegisterVm> registerValidator
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

		User user = mapper.Map<RegisterVm, User>(vm);

		user.Photo = await imageService.SaveImageAsync(vm.Image);

		try {
			IdentityResult identityResult = await userManager.CreateAsync(user, vm.Password);
			if (!identityResult.Succeeded)
				return BadRequest(identityResult.Errors);

			identityResult = await userManager.AddToRoleAsync(user, Roles.User);

			if (!identityResult.Succeeded) {
				await userManager.DeleteAsync(user);
				imageService.DeleteImageIfExists(user.Photo);
				return BadRequest("Role assignment error");
			}

			return Ok(new JwtTokenResponse {
				Token = await jwtTokenService.CreateTokenAsync(user)
			});
		}
		catch {
			imageService.DeleteImageIfExists(user.Photo);
			throw;
		}
	}
}
