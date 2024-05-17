import { IconBed, IconHelp, IconPlane } from "@tabler/icons-react";
import bookingLogo from "assets/booking.svg";
import ukraineFlag from "assets/ukraine-flag.svg";
import { Button } from "components/ui/Button.tsx";

const Header = () => {
    return (
        <div className="bg-blue py-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <a href="/">
                        <img src={bookingLogo} className="w-36" alt="Booking logo" />
                    </a>
                    <div className="flex items-center gap-2">
                        <Button variant="transparent">UAH</Button>

                        <Button variant="transparent">
                            <img className="h-6" src={ukraineFlag} alt="flag" />
                        </Button>

                        <Button variant="transparent">
                            <IconHelp className="text-white h-6 w-6" />
                        </Button>

                        <Button variant="transparent">Зареєструвати своє помешкання</Button>

                        <Button variant="secondary" size="sm">
                            Зареєструватися
                        </Button>

                        <Button variant="secondary" size="sm">
                            Увійти
                        </Button>
                    </div>
                </div>

                <div className="inline-flex gap-2">
                    <Button variant="rounded" size="md" className="border border-white">
                        <IconBed className="h-5" />
                        Помешкання
                    </Button>

                    <Button variant="rounded" size="md">
                        <IconPlane className="h-5" />
                        Переліт
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Header;