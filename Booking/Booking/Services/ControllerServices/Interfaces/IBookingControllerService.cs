﻿using Booking.ViewModels.Booking;
using Booking.ViewModels.City;

namespace Booking.Services.ControllerServices.Interfaces;

public interface IBookingControllerService {
	Task CreateAsync(CreateBookingVm vm, long userId);
	Task UpdateAsync(UpdateBookingVm vm);
	Task DeleteIfExistsAsync(long id);
}