import React, { useState } from 'react';

const SubscribeForm: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Додайте логіку для обробки підписки тут
        console.log(`Subscribed with email: ${email}`);
    };

    return (
        <div className="flex items-center justify-center bg-darkblue py-12">
            <div className=" w-full-lg max-w-7xl text-center text-white ">
                <h2 className="text-2xl font-main ">Будьте в курсі</h2>
                <p className=" text-lightgray font-main ">
                    Підпишіться, щоб отримувати електронну маркетингову розсилку від Booking.com, зокрема листи про акції, винагороди, туристичні продукти та інформацію про рішення й послуги Booking.com та Booking.com Transport Limited.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5">
                    <input
                        type="email"
                        placeholder="Ваша електронна пошта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full sm:w-96 px-4 py-4 text-lightgray rounded-md font-main text-xl"
                        required
                    />
                    <button type="submit" className="bg-sky  text-white w-full sm:w-auto px-10 py-4 rounded-md">
                        Підписатись
                    </button>
                </form>
                <p className="mt-3 text-sm font-main text-lightgray">
                    Ви завжди можете відписатися. Перегляньте наше <a href="#" className="underline text-lightblue">положення про конфіденційність</a>.
                </p>
            </div>
        </div>
    );
};

export default SubscribeForm;
