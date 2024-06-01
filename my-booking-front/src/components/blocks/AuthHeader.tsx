import { IconHelp } from "@tabler/icons-react";
import bookingLogo from "assets/booking.svg";
import ukraineFlag from "assets/ukraine-flag.svg";
import { Button } from "components/ui/Button.tsx";
import { Link } from "react-router-dom";

const AuthHeader = () => {
    return (
        <div className="bg-blue py-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <Link to="/">
                        <img src={bookingLogo} className="w-28" alt="Booking logo" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Button variant="transparent">
                            <img className="h-6" src={ukraineFlag} alt="flag" />
                        </Button>

                        <Button variant="transparent">
                            <IconHelp className="text-white h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthHeader;
