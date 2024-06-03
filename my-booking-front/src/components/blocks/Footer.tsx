import LogoCarousel from "components/blocks/LogoCarousel.tsx";

const Footer = () => {
    return (
        <div className="flex flex-col  my-5 gap-5">
            <div className="relative h-10 overflow-hidden">
                <LogoCarousel />
            </div>
            <div className="container flex flex-col mx-auto gap-5">
                <p className="text-xs text-center">
                    Авторські права © 1996–2024 Booking.com™. Усі права захищено.
                </p>
                <p className="text-xs text-center text-lightgray">
                    Booking.com входить у групу компаній Booking Holdings Inc. – світового лідера в галузі
                    онлайн-туризму та супутніх послуг.
                </p>
            </div>
        </div>
    );
};

export default Footer;
