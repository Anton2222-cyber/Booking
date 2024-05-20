using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Services.Interfaces;
using Booking.ViewModels.City;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CitiesController(
        DataContext context,
        IMapper mapper,
        IValidator<CreateCityVm> createValidator,
        IValidator<UpdateCityVm> updateValidator,
        ICitiesControllerService service
        ) : ControllerBase {

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var cities = await context.Cities
                .ProjectTo<CityVm>(mapper.ConfigurationProvider)
                .ToArrayAsync();

            return Ok(cities);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CreateCityVm vm) 
        {
            var validationResult = await createValidator.ValidateAsync(vm);

            if (!validationResult.IsValid)
                return BadRequest(validationResult.Errors);

            var city = await service.CreateAsync(vm);

            return Ok(mapper.Map<CityVm>(city));
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromForm] UpdateCityVm vm)
        {
            var validationResult = await updateValidator.ValidateAsync(vm);

            if (!validationResult.IsValid)
                return BadRequest(validationResult.Errors);

            var city = await service.UpdateAsync(vm);

            return Ok(mapper.Map<CityVm>(city));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            await service.DeleteIfExistsAsync(id);
            return Ok();
        }
    }
}
