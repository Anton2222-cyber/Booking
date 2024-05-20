using AutoMapper;
using Booking.Constants;
using Booking.Services;
using Booking.Services.Interfaces;
using Booking.ViewModels.Account;
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
	IConfiguration configuration
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
	public async Task<IActionResult> Registration([FromForm] RegisterVm model) {
		if (await userManager.FindByEmailAsync(model.Email) is not null)
			return BadRequest("The user with this email is already registered");

		User user = mapper.Map<RegisterVm, User>(model);

		try {
			user.Photo = await imageService.SaveImageAsync(model.Image);
		}
		catch (Exception) {
			return BadRequest("Image error");
		}

		try {
			IdentityResult identityResult = await userManager.CreateAsync(user, model.Password);
			if (!identityResult.Succeeded)
				return BadRequest(identityResult.Errors.First().Description);

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
