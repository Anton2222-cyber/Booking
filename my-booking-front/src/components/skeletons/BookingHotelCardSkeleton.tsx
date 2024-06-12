const BookingHotelCardSkeleton = () => {
    return (
        <div className="flex items-center bg-gray/20 animate-pulse shadow rounded-lg p-4">
            <div className="w-20 h-20 rounded-lg bg-gray/30"></div>
            <div className="ml-4 flex-grow flex flex-col gap-2">
                <div className="h-4 bg-gray/30 rounded w-3/5"></div>
                <div className="h-3 bg-gray/30 rounded w-1/2"></div>
                <div className="h-3 bg-gray/30 rounded w-1/4"></div>
            </div>
            <div className="text-right flex justify-center items-center gap-3">
                <div>
                    <div className="h-6 bg-gray/30 rounded w-16"></div>
                    <div className="h-4 bg-gray/30 rounded w-24 mt-2"></div>
                </div>
                <div className="h-8 w-8 rounded-full bg-gray-300"></div>
            </div>
        </div>
    );
};

export default BookingHotelCardSkeleton;
