using Booking.Extensions;
using Booking.Mapper;
using Booking.Services;
using Booking.Services.Interfaces;
using Booking.Services.PaginationServices;
using Booking.Validators.Country;
using Booking.ViewModels.City;
using Booking.ViewModels.Country;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Model.Context;
using Model.Entities.Identity;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var assemblyName = AssemblyService.GetAssemblyName();

builder.Services.AddDbContext<DataContext>(
	options => {
		options.UseNpgsql(
			builder.Configuration.GetConnectionString("Npgsql"),
			npgsqlOptions => npgsqlOptions.MigrationsAssembly(assemblyName)
		);

		if (builder.Environment.IsDevelopment()) {
			options.EnableSensitiveDataLogging();
		}
	}
);

builder.Services
	.AddIdentity<User, Role>(options => {
		options.Stores.MaxLengthForKeys = 128;

		options.Password.RequiredLength = 8;
		options.Password.RequireDigit = false;
		options.Password.RequireNonAlphanumeric = false;
		options.Password.RequireUppercase = false;
		options.Password.RequireLowercase = false;
	})
	.AddEntityFrameworkStores<DataContext>()
	.AddDefaultTokenProviders();

var singinKey = new SymmetricSecurityKey(
	Encoding.UTF8.GetBytes(
		builder.Configuration["Authentication:Jwt:SecretKey"]
			?? throw new NullReferenceException("Authentication:Jwt:SecretKey")
	)
);

builder.Services
	.AddAuthentication(options => {
		options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
		options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
		options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
	})
	.AddJwtBearer(options => {
		options.SaveToken = true;
		options.RequireHttpsMetadata = false;
		options.TokenValidationParameters = new TokenValidationParameters() {
			ValidateIssuer = false,
			ValidateAudience = false,
			IssuerSigningKey = singinKey,
			ValidateLifetime = true,
			ValidateIssuerSigningKey = true,
			ClockSkew = TimeSpan.Zero
		};
	});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
	options.AddSecurityDefinition(
		"Bearer",
		new OpenApiSecurityScheme {
			Description = "Jwt Auth header using the Bearer scheme",
			Type = SecuritySchemeType.Http,
			Scheme = "bearer"
		}
	);
	options.AddSecurityRequirement(new OpenApiSecurityRequirement {
		{
			new OpenApiSecurityScheme {
				Reference = new OpenApiReference {
					Id = "Bearer",
					Type = ReferenceType.SecurityScheme
				}
			},
			new List<string>()
		}
	});
});



builder.Services.AddAutoMapper(typeof(AppMapProfile));
builder.Services.AddValidatorsFromAssemblyContaining<CreateCountryValidator>();

builder.Services.AddTransient<IImageService, ImageService>();
builder.Services.AddTransient<IImageValidator, ImageValidator>();
builder.Services.AddTransient<ICountriesControllerService, CountriesControllerService>();
builder.Services.AddTransient<IPaginationService<CountryVm, CountryFilterVm>, CountryPaginationService>();
builder.Services.AddTransient<ICitiesControllerService, CitiesControllerService>();
builder.Services.AddTransient<IPaginationService<CityVm, CityFilterVm>, CityPaginationService>();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
	app.UseSwagger();
	app.UseSwaggerUI();
}

string imagesDirPath = app.Services.GetRequiredService<IImageService>().ImagesDir;

if (!Directory.Exists(imagesDirPath)) {
	Directory.CreateDirectory(imagesDirPath);
}

app.UseStaticFiles(new StaticFileOptions {
	FileProvider = new PhysicalFileProvider(imagesDirPath),
	RequestPath = "/images"
});

app.UseCors(
	configuration => configuration
		.AllowAnyOrigin()
		.AllowAnyHeader()
		.AllowAnyMethod()
);

app.UseAuthorization();

app.MapControllers();

await app.MigrateAsync();

app.Run();
