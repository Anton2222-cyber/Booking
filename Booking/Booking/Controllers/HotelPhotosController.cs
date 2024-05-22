using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Services.Interfaces;
using Booking.Validators.HotelPhoto;
using Booking.ViewModels.City;
using Booking.ViewModels.HotelPhoto;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model.Context;

namespace Booking.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HotelPhotosController(
        DataContext context,
        IMapper mapper,
        IValidator<CreateHotelPhotoVm> createValidator,
        IValidator<UpdateHotelPhotoVm> updateValidator,
        IHotelPhotoControllerService service,
        IPaginationService<HotelPhotoVm, HotelPhotoFilterVm> pagination
        ) : ControllerBase {

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var photos = await context.HotelPhotos
                .ProjectTo<HotelPhotoVm>(mapper.ConfigurationProvider)
                .ToArrayAsync();

            return Ok(photos);
        }

        [HttpGet]
        public async Task<IActionResult> GetPage([FromQuery] HotelPhotoFilterVm vm)
        {
            try
            {
                return Ok(await pagination.GetPageAsync(vm));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            var photos = await context.HotelPhotos
                .ProjectTo<HotelPhotoVm>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (photos is null)
                return NotFound();

            return Ok(photos);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CreateHotelPhotoVm vm)
        {
            var validationResult = await createValidator.ValidateAsync(vm);

            if (!validationResult.IsValid)
                return BadRequest(validationResult.Errors);

            await service.CreateAsync(vm);

            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromForm] UpdateHotelPhotoVm vm)
        {
            var validatoinResult = await updateValidator.ValidateAsync(vm);

            if (!validatoinResult.IsValid)
                return BadRequest(validatoinResult.Errors);

            await service.UpdateAsync(vm);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            await service.DeleteIfExistsAsync(id);
            return Ok();
        }
    }
}
