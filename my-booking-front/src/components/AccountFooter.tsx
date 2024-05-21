const AccountFooter = () => {
    return (
        <div className="mx-auto max-w-md px-8">
            <p className="mt-6 text-center text-xs">
                Входячи в акаунт або створюючи новий, ви погоджуєтеся з нашими{" "}
                <a href="#" className="text-sky hover:underline">
                    Правилами та умовами
                </a>{" "}
                та{" "}
                <a href="#" className="text-sky hover:underline">
                    Політикою конфіденційності
                </a>
                .
            </p>
            <p className="mt-4 text-center  text-xs">Усі права захищено.</p>
            <p className="mt-2 text-center  text-xs">Copyright (2006 - 2024) - Booking.com™</p>
        </div>
    );
};

export default AccountFooter;
