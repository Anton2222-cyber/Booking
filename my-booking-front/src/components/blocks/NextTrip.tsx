import logo from "assets/next_trip_banner.png";
import { Button } from "components/ui/Button.tsx";

const NextTrip = () => {
    return (
        <div className="flex flex-col container mx-auto mt-5 gap-2">
            <div className="relative border border-lightgray/20 rounded-md overflow-hidden flex justify-between h-72">
                <div className="flex-grow flex flex-col items-center justify-center">
                    <div className="relative w-72 flex flex-col gap-5">
                        <span className="text-2xl font-bold text-white">
                            Знайдіть апартаменти для вашої наступної подорожі
                        </span>
                        <Button variant="secondary" size="sm">
                            Переглянути приватні помешкання
                        </Button>
                        <div className="absolute -top-24 -bottom-24 -right-20 -left-20 rounded-full bg-sky -z-10"></div>
                    </div>
                </div>

                <div className="flex-shrink-0">
                    <img className="h-full  object-contain" src={logo} alt="logo" />
                </div>

                <div className="absolute bottom-10 -left-5 rounded-full bg-yellow h-20 w-20 -z-20"></div>
            </div>
        </div>
    );
};

export default NextTrip;
