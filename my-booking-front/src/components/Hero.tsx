import { Button } from "components/ui/Button.tsx";

const Hero = () => {
    return (
        <div className="h-96 bg-[url('assets/hero.jpeg')] bg-cover">
            <div className="relative h-full container mx-auto grid grid-cols-2 pt-12 pb-24">
                <div className="text-white col-span-1 flex flex-col justify-between">
                    <h1 className="text-5xl font-bold">Візьміть із собою всю коробку з іграшками</h1>

                    <h3 className="col-span-1 text-white text-3xl">Розслабтеся в будинку для відпочинку</h3>

                    <div>
                        <Button variant="primary" size="lg">
                            Шукати помешкання для відпустки
                        </Button>
                    </div>
                </div>

                <div className="absolute -bottom-6 left-0 right-0 bg-yellow p-1 rounded-md">
                    <Button variant="primary" size="xl">
                        Шукати
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
