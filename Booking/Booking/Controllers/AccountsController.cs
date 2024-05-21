﻿using AutoMapper;
using Booking.Constants;
using Booking.Services.Interfaces;
using Booking.ViewModels.Account;
using FluentValidation;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Model.Context;
using Model.Entities.Identity;
using static Google.Apis.Auth.GoogleJsonWebSignature;

namespace Booking.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AccountsController(
	DataContext context,
	UserManager<User> userManager,
	IJwtTokenService jwtTokenService,
	IMapper mapper,
	IImageService imageService,
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

		using var transaction = await context.Database.BeginTransactionAsync();

		try {
			IdentityResult identityResult = await userManager.CreateAsync(user, vm.Password);
			if (!identityResult.Succeeded) {
				await transaction.RollbackAsync();
				imageService.DeleteImageIfExists(user.Photo);

				return StatusCode(500, identityResult.Errors);
			}

			identityResult = await userManager.AddToRoleAsync(user, Roles.User);

			if (!identityResult.Succeeded) {
				await transaction.RollbackAsync();
				imageService.DeleteImageIfExists(user.Photo);

				return StatusCode(500, "Role assignment error");
			}

			await transaction.CommitAsync();

			return Ok(new JwtTokenResponse {
				Token = await jwtTokenService.CreateTokenAsync(user)
			});
		}
		catch {
			await transaction.RollbackAsync();
			imageService.DeleteImageIfExists(user.Photo);
			throw;
		}
	}

	[HttpPost]
	public async Task<IActionResult> GoogleSignIn([FromForm] GoogleSignInVm model) {
		Payload payload;
		try {
			payload = await ValidateAsync(
				model.Credential,
				new ValidationSettings {
					Audience = [configuration["Authentication:Google:ClientId"]]
				}
			);
		}
		catch (InvalidJwtException e) {
			return Unauthorized(e.Message);
		}


		var user = await userManager.FindByEmailAsync(payload.Email);

		if (user is null) {
			using var httpClient = new HttpClient();

			user = new User {
				FirstName = payload.GivenName,
				LastName = payload.FamilyName,
				Email = payload.Email,
				UserName = payload.Email,
				Photo = await imageService.SaveImageAsync(await httpClient.GetByteArrayAsync(payload.Picture))
			};

			using var transaction = await context.Database.BeginTransactionAsync();

			try {
				IdentityResult identityResult = await userManager.CreateAsync(user);
				if (!identityResult.Succeeded) {
					await transaction.RollbackAsync();
					imageService.DeleteImageIfExists(user.Photo);

					return StatusCode(500, identityResult.Errors);
				}

				identityResult = await userManager.AddToRoleAsync(user, Roles.User);

				if (!identityResult.Succeeded) {
					await transaction.RollbackAsync();
					imageService.DeleteImageIfExists(user.Photo);

					return StatusCode(500, "Role assignment error");
				}

				await transaction.CommitAsync();
			}
			catch {
				await transaction.RollbackAsync();
				imageService.DeleteImageIfExists(user.Photo);
			}

			await userManager.AddToRoleAsync(user, Roles.User);
		}

		return Ok(new JwtTokenResponse {
			Token = await jwtTokenService.CreateTokenAsync(user)
		});
	}
}