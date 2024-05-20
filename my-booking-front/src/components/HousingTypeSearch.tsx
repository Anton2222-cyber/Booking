import AccommodationTypeCard from "components/ui/AccommodationTypeCard.tsx";
import Label from "components/ui/Label.tsx";

const HousingTypeSearch = () => {
    return (
        <div className="flex flex-col container mx-auto mt-5 gap-2">
            <Label variant="title">Пошук за типом помешкання</Label>
            <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <AccommodationTypeCard
                        title="Апартаменти"
                        imageSrc="https://picsum.photos/500/800"
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default HousingTypeSearch;
