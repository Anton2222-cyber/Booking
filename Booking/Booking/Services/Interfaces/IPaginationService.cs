using Booking.ViewModels.Pagination;

namespace Booking.Services.Interfaces;

public interface IPaginationService<EntityVmType, PaginationVmType> where PaginationVmType : PaginationVm {
	Task<PageVm<EntityVmType>> GetPageAsync(PaginationVmType vm);
}