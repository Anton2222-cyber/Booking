const HotelCardSkeleton = () => {
    return (
        <div className="relative flex border border-lightgray/20 rounded-lg p-4 animate-pulse">
            <div className="relative flex-none w-60">
                <div className="w-full h-60 bg-gray/20 rounded-lg"></div>
            </div>
            <div className="ml-4 w-3/5">
                <div className="h-5 bg-gray/20 rounded w-3/4"></div>
                <div className="h-4 bg-gray/20 rounded w-2/3 mt-1"></div>
                <div className="h-20 bg-gray/20 rounded w-4/5 mt-1"></div>
            </div>
            <div className="w-1/5 flex flex-col gap-5 ml-4 animate-pulse">
                <div>
                    <div className="h-5 bg-gray/20 rounded w-full"></div>
                    <div className="h-3 bg-gray/20 rounded w-full mt-1"></div>
                </div>
                <div className="h-10 bg-gray/20 rounded mt-1"></div>
            </div>
        </div>
    );
};

export default HotelCardSkeleton;
