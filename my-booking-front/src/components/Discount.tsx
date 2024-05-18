import banner from "../assets/banner-discount.jpg";

const Discount = () => {
    return (
        <div className="mt-10 container border border-lightgray/20 rounded-md mx-auto grid grid-cols-7 overflow-hidden">
            <div className="m-4 ps-4 text-2xl text-black font-bold col-span-4 flex flex-col justify-between">
                <h1 className=" text-2xl text-black font-bold  ">
                    Забронюйте й зекономте 7% на Rentalcars.com завдяки ваучеру
                </h1>
                <p className="text-blue text-sm cursor-pointer hover:underline font-bold">
                    Переглянути деталі акції
                </p>
            </div>

            <div className="col-span-3 overflow-hidden flex relative">
                <img className="object-cover w-full max-h-32" src={banner} alt="banner" />
            </div>
        </div>
    );
};

export default Discount;
