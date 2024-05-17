using Booking.Services;
using Microsoft.EntityFrameworkCore;
using Model.Context;

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

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
	app.UseSwagger();
	app.UseSwaggerUI();
}


app.UseAuthorization();

app.MapControllers();

app.Run();
