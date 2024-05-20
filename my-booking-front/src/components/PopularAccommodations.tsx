import AccommodationCard from "components/ui/AccomodationCard.tsx";
import Label from "components/ui/Label.tsx";

const PopularAccommodations = () => {
    return (
        <div className="flex flex-col container mx-auto mt-5 gap-2">
            <div>
                <Label variant="title">Забронюйте наші найпопулярніші унікальні помешкання</Label>
                <Label variant="subtitle">Від замків і вілл до ботелів та іглу – у нас є все</Label>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <AccommodationCard
                        rating={9.5}
                        numberOfReviews={100}
                        name="Hilton"
                        location="Київ"
                        imageSrc="https://picsum.photos/600/800"
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default PopularAccommodations;
