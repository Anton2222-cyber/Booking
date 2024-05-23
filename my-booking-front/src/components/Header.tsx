import { IconBed, IconHelp, IconPlane } from "@tabler/icons-react";
import bookingLogo from "assets/booking.svg";
import ukraineFlag from "assets/ukraine-flag.svg";
import { Button } from "components/ui/Button.tsx";
import { Link } from "react-router-dom";
import { useAppSelector } from "store/index.ts";
import { getUser } from "store/slice/userSlice.ts";
import { API_URL } from "utils/getEnvData.ts";

const Header = () => {
    const user = useAppSelector(getUser);

    return (
        <div className="bg-blue py-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <Link to="/">
                        <img src={bookingLogo} className="w-36" alt="Booking logo" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Button variant="transparent">UAH</Button>

                        <Button variant="transparent">
                            <img className="h-6" src={ukraineFlag} alt="flag" />
                        </Button>

                        <Button variant="transparent">
                            <IconHelp className="text-white h-6 w-6" />
                        </Button>

                        <Button variant="transparent">Зареєструвати своє помешкання</Button>

                        {user ? (
                            <Button variant="transparent">
                                <div className="flex gap-2">
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={`${API_URL}/images/200_${user.photo}`}
                                        alt="avatar"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-start text-white text-sm">
                                            {user.firstName} {user.lastName}
                                        </span>
                                        <span className="text-start text-yellow text-xs">
                                            Genius 1-го рівня
                                        </span>
                                    </div>
                                </div>
                            </Button>
                        ) : (
                            <>
                                <Button variant="secondary" size="sm">
                                    Зареєструватися
                                </Button>

                                <Link to={"auth/login"}>
                                    <Button variant="secondary" size="sm">
                                        Увійти
                                    </Button>
                                </Link>
                            </>
                        )}
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
