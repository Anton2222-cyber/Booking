const CityCardSkeleton = () => {
    return (
        <div className="w-full max-w-xs mx-auto animate-pulse">
            <div className="rounded overflow-hidden ">
                <div className="mb-2">
                    <div className="w-full h-36 bg-lightgray/20  rounded-lg"></div>
                </div>
                <div className="py-0.5">
                    <div className="h-4 w-1/3 bg-lightgray/20  rounded"></div>
                </div>
                <div className="py-0.5">
                    <div className="h-4 w-1/2 bg-lightgray/20  rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default CityCardSkeleton;
