interface IAccommodationTypeCardProps {
    imageSrc: string;
    title: string;
}

interface ICityCardProps {
    imageSrc: string;
    cityName: string;
    geolocation: number;
}

interface IAccommodationCardProps {
    imageSrc: string;
    name: string;
    location: string;
    rating: number;
    numberOfReviews: number;
}

interface IHotelCardProps {
    hotelName: string;
    description: string;
    location: string;
    distanceFromCenter: number;
    imageUrl: string;
    rating: number;
    reviewCount: number;
}