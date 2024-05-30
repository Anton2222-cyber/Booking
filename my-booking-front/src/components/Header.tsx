import { IconBed, IconHelp, IconPlane } from "@tabler/icons-react";
import bookingLogo from "assets/booking.svg";
import ukraineFlag from "assets/ukraine-flag.svg";
import UserPanel from "components/UserPanel.tsx";
import { Button } from "components/ui/Button.tsx";
import { Link } from "react-router-dom";
import { useAppSelector } from "store/index.ts";
import { getUser } from "store/slice/userSlice.ts";

const Header = () => {
    const user = useAppSelector(getUser);

    return (
        <div className="bg-blue py-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <Link to="/">
                        <img src={bookingLogo} className="w-36" alt="Booking logo" />

                        {/*<motion.img*/}
                        {/*    src={bookingLogo}*/}
                        {/*    className="w-36"*/}
                        {/*    alt="Booking logo"*/}
                        {/*    animate={{ rotate: 360 }}*/}
                        {/*    transition={{*/}
                        {/*        duration: 2,*/}
                        {/*        repeat: Infinity,*/}
                        {/*        repeatDelay: 1,*/}
                        {/*        repeatType: "reverse",*/}
                        {/*        type: "tween",*/}
                        {/*        ease: "easeInOut",*/}
                        {/*    }}*/}
                        {/*/>*/}
                    </Link>
                    <div className="flex items-center gap-2">
                        <Button variant="transparent">UAH</Button>

                        <Button variant="transparent">
                            <img className="h-6" src={ukraineFlag} alt="flag" />
                        </Button>

                        <Button variant="transparent">
                            <IconHelp className="text-white h-6 w-6" />
                        </Button>

                        <Link to={"hotel/create"}>
                            <Button variant="transparent">Зареєструвати своє помешкання</Button>
                        </Link>

                        {user ? (
                            <UserPanel {...user} />
                        ) : (
                            <>
                                <Link to={"auth/register"}>
                                    <Button variant="secondary" size="sm">
                                        Зареєструватися
                                    </Button>
                                </Link>

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
