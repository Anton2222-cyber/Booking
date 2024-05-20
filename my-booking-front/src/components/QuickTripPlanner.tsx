import { IconHeart } from "@tabler/icons-react";
import { Button } from "components/ui/Button.tsx";
import Label from "components/ui/Label.tsx";

const QuickTripPlanner = () => {
    return (
        <div className="container mx-auto mt-5">
            <Label variant="title">Сплануйте поїздку швидко та просто</Label>
            <Label variant="subtitle">Виберіть тип відпочинку та відвідайте найкращі місця в Україні</Label>
            <Button variant="rounded" className="border border-sky bg-sky/5 hover:bg-sky/5 text-sky">
                <IconHeart className="h-5" />
                Романтика
            </Button>
        </div>
    );
};

export default QuickTripPlanner;
