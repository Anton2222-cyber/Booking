using AutoMapper;
using Booking.Services.PaginationServices.Base;
using Booking.ViewModels.HotelPhoto;
using Model.Context;
using Model.Entities;

namespace Booking.Services.PaginationServices
{
    public class HotelPhotoPaginationService(
        DataContext context,
        IMapper mapper
        ) : PaginationService<HotelPhoto, HotelPhotoVm, HotelPhotoFilterVm>(mapper) {

        protected override IQueryable<HotelPhoto> GetQuery() => context.HotelPhotos;

        protected override IQueryable<HotelPhoto> FilterQuery(IQueryable<HotelPhoto> query, HotelPhotoFilterVm vm)
        {
            if (vm.IsRandomItems == true)
                query = query.OrderBy(c => Guid.NewGuid());
            else
                query = query.OrderBy(c => c.Id);

            if (vm.Priority is not null)
                query = query.Where(c => c.Priority == vm.Priority);
            if (vm.MinPriority is not null)
                query = query.Where(c => c.Priority >=  vm.MinPriority);
            if (vm.MaxPriority is not null)
                query = query.Where(c => c.Priority <= vm.MaxPriority);

            if (vm.HotelId is not null)
                query = query.Where(c => c.HotelId ==  vm.HotelId);

            return query;
        }
    }
}
