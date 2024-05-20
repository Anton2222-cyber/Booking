import logo1 from "assets/footer01.png";
import logo2 from "assets/footer02.png";
import logo3 from "assets/footer03.png";
import logo4 from "assets/footer04.png";
import logo5 from "assets/footer05.png";

const Footer = () => {
    return (
        <div className="flex flex-col container mx-auto my-5 gap-5">
            <p className="text-xs text-center">
                Авторські права © 1996–2024 Booking.com™. Усі права захищено.
            </p>
            <p className="text-xs text-center text-lightgray">
                Booking.com входить у групу компаній Booking Holdings Inc. – світового лідера в галузі
                онлайн-туризму та супутніх послуг.
            </p>
            <div className="flex items-center justify-center gap-10">
                <img src={logo1} alt="logo partners" />
                <img src={logo2} alt="logo partners" />
                <img src={logo3} alt="logo partners" />
                <img src={logo4} alt="logo partners" />
                <img src={logo5} alt="logo partners" />
            </div>
        </div>
    );
};

export default Footer;
