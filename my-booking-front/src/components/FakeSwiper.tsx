import React from "react";

interface IFakeSwiperProps {
    slidesPerView: number;
    children: React.ReactNode;
}

const FakeSwiper: React.FC<IFakeSwiperProps> = (props) => {
    const { slidesPerView, children } = props;

    return (
        <div className="container flex gap-4 mx-auto p-0">
            {Array.from({ length: slidesPerView }).map((_, index) => (
                <div className="w-full" key={index}>
                    {children}
                </div>
            ))}
        </div>
    );
};

export default FakeSwiper;
