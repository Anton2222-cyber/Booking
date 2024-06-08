const HotelCardTypesSkeleton = () => {
    return (
        <div className="max-w-sm mx-auto rounded-lg overflow-hidden animate-pulse">
            <div className="w-full h-60 bg-gray/20 rounded-t-lg"></div>
            <div className="py-4">
                <div className="h-5 bg-gray/20 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray/20 rounded w-3/4 mb-2"></div>
                <div className="flex items-center">
                    <div className="bg-gray/20 text-sm font-bold rounded-md w-7 h-7 mr-2"></div>
                    <div className="h-4 bg-gray/20 rounded w-3/4"></div>
                </div>
                <div className="h-4 bg-gray/20 rounded w-full mt-4"></div>
                <div className="h-4 bg-gray/20 rounded w-2/5 mt-2"></div>
                <div className="h-10 bg-gray/20 rounded mt-2"></div>
            </div>
        </div>
    );
};

export default HotelCardTypesSkeleton;
