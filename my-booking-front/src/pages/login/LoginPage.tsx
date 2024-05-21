import React from 'react';

const LoginPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center ">
            {/* Верхній синій блок */}
            <div className="w-full bg-blue text-white py-4 px-56 flex justify-between items-center">
                <div className="text-lg font-bold font-main ">Booking.com</div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-6 cursor-pointer">

                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg"
                                alt="UA Flag"
                                className="w-6 h-6 rounded-full"
                            />
                        </div>
                        <div className="w-10 h-10  rounded-full flex items-center justify-center cursor-pointer">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/41/41943.png"
                                alt="Help Icon"
                                className="w-6 h-6 filter invert"
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* Блок входу */}
            <div className="bg-white p-8 rounded  w-full max-w-md ">
                <h1 className="text-2xl font-main mb-6 font-extrabold ">Увійдіть або створіть акаунт</h1>

                <div>
                    <label title={"Електронна пошта"} className="text-sm block font-semibold mb-2">Електронна пошта</label>
                    <input
                        type="email"

                        placeholder="Введіть свою електронну адресу"
                        className="w-full p-3 border border-gray-300 rounded mb-4"
                    />
                </div>
                <button className="w-full bg-sky text-white p-3 rounded font-semibold mb-6 hover:bg-blue-600">
                    Продовжити з електронною поштою
                </button>
                <div className="flex items-center mb-6">
                    <div className="flex-grow border-t text-gray"></div>
                    <span className="mx-4  text-sm">або вибрати один із цих варіантів</span>
                    <div className="flex-grow border-t text-gray"></div>
                </div>
                <button
                    className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded flex items-center justify-center font-semibold hover:bg-gray-100">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                        alt="Google"
                        className="w-5 h-5 mr-2"
                    />
                    Продовжити з Google
                </button>

                <div className="border-t text-gray mt-8"></div>

                {/* Текст з посиланнями і авторськими правами */}
                <p className="mt-6 text-center  text-xs">
                    Входячи в акаунт або створюючи новий, ви погоджуєтеся з нашими{' '}
                    <a href="#" className="text-sky hover:underline">Правилами та умовами</a> та{' '}
                    <a href="#" className="text-sky hover:underline">Політикою конфіденційності</a>.
                </p>
                <p className="mt-4 text-center  text-xs">
                    Усі права захищено.
                </p>
                <p className="mt-2 text-center  text-xs">
                    Copyright (2006 - 2024) - Booking.com™
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
