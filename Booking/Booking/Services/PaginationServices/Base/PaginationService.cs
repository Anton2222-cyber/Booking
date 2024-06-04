﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Services.Interfaces;
using Booking.ViewModels.Pagination;
using Microsoft.EntityFrameworkCore;

namespace Booking.Services.PaginationServices.Base;

public abstract class PaginationService<EntityType, EntityVmType, PaginationVmType>(
	IMapper mapper
) : IPaginationService<EntityVmType, PaginationVmType> where PaginationVmType : PaginationVm {

	public async Task<PageVm<EntityVmType>> GetPageAsync(PaginationVmType vm) {
		if (vm.PageSize is not null && vm.PageIndex is null)
			throw new Exception("PageIndex is required if PageSize is initialized");

		if (vm.PageIndex < 0)
			throw new Exception("PageIndex less than 0");

		if (vm.PageSize < 1)
			throw new Exception("PageSize is invalid");


		var query = GetQuery();

		query = FilterQuery(query, vm);

		int count = await query.CountAsync();

		int pagesAvailable;

		if (vm.PageSize is not null) {
			pagesAvailable = (int)Math.Ceiling(count / (double)vm.PageSize);
			query = query
				.Skip((int)vm.PageIndex! * (int)vm.PageSize)
				.Take((int)vm.PageSize);
		}
		else {
			pagesAvailable = (count > 0) ? (1) : (0);
		}

		var data = await query
			.ProjectTo<EntityVmType>(mapper.ConfigurationProvider)
			.ToArrayAsync();

		return new PageVm<EntityVmType> {
			Data = data,
			PagesAvailable = pagesAvailable,
			ItemsAvailable = count
		};
	}

	protected abstract IQueryable<EntityType> GetQuery();

	protected abstract IQueryable<EntityType> FilterQuery(IQueryable<EntityType> query, PaginationVmType paginationVm);
}
