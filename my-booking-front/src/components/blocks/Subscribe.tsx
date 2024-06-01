import { Button } from "components/ui/Button.tsx";
import { Input } from "components/ui/Input.tsx";

import React, { useState } from "react";

const Subscribe: React.FC = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Subscribed with email: ${email}`);
    };

    return (
        <div className="flex flex-col py-5 my-5 gap-5 bg-darkblue">
            <div className="container mx-auto w-full-lg max-w-7xl text-center text-white ">
                <h2 className="text-2xl font-main ">Будьте в курсі</h2>
                <p className=" text-lightgray font-main ">
                    Підпишіться, щоб отримувати електронну маркетингову розсилку від Booking.com, зокрема
                    листи про акції, винагороди, туристичні продукти та інформацію про рішення й послуги
                    Booking.com та Booking.com Transport Limited.
                </p>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5"
                >
                    <Input
                        type="email"
                        placeholder="Ваша електронна пошта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="sm:w-96 px-4 py-2 text-lightgray rounded-md font-main text-xl"
                        required
                    />
                    <Button className="text-xl" size="xl" type="submit">
                        Підписатись
                    </Button>
                </form>
                <p className="mt-3 text-sm font-main text-lightgray">
                    Ви завжди можете відписатися. Перегляньте наше{" "}
                    <a href="#" className="underline text-lightblue">
                        положення про конфіденційність
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};

export default Subscribe;
