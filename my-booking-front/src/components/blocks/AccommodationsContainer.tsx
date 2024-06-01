import Swiper from "components/Swiper.tsx";

import React from "react";

interface IAccommodationBlockProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    id?: string;
}

const AccommodationsContainer: React.FC<IAccommodationBlockProps> = (props) => {
    const { title, subtitle, children, id } = props;

    return (
        <div className="mt-10 container mx-auto ">
            <div className="border border-lightgray/20 rounded-md overflow-hidden pt-5 px-6">
                <h1 className="font-bold text-black mb-1">{title}</h1>
                {subtitle && <h2 className="text-sm  text-gray mb-1">{subtitle}</h2>}
                <Swiper id={id || ""} slidesPerView={4}>
                    {children}
                </Swiper>
            </div>
        </div>
    );
};

export default AccommodationsContainer;
