const AdvertisingContainer = () => {
    return (
        <div className="relative w-full h-80">
            <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop>
                <source src="https://booking-api.ihor88.click/images/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default AdvertisingContainer;
