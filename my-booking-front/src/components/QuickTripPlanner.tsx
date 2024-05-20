import { IconHeart } from "@tabler/icons-react";
import { Button } from "components/ui/Button.tsx";
import CityCard from "components/ui/CityCard.tsx";
import Label from "components/ui/Label.tsx";

const QuickTripPlanner = () => {
    return (
        <div className="flex flex-col container mx-auto mt-5 gap-2">
            <div>
                <Label variant="title">Сплануйте поїздку швидко та просто</Label>
                <Label variant="subtitle">
                    Виберіть тип відпочинку та відвідайте найкращі місця в Україні
                </Label>
            </div>

            <div>
                <Button variant="rounded" className="border border-sky bg-sky/5 hover:bg-sky/5 text-sky">
                    <IconHeart className="h-5" />
                    Романтика
                </Button>
            </div>

            <div className="grid grid-cols-5 gap-4">
                {Array.from({ length: 5 }).map((_, index) => (
                    <CityCard
                        cityName="Київ"
                        geolocation={50}
                        imageSrc="https://picsum.photos/500/700"
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default QuickTripPlanner;
