import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper as SwiperReact } from "swiper/react";

import React from "react";

import "../index.css";

interface ISwiperProps {
    slidesPerView: number;
    children: React.ReactNode;
}

const Swiper: React.FC<ISwiperProps> = (props) => {
    const { slidesPerView, children } = props;

    return (
        <div className="swiper-container relative container mx-auto p-0">
            <SwiperReact
                modules={[Navigation]}
                loop={true}
                navigation={{
                    nextEl: ".custom-swiper-button-next",
                    prevEl: ".custom-swiper-button-prev",
                }}
                spaceBetween={15}
                slidesPerView={slidesPerView}
                className="swiper-wrapper bg-transparent pb-4"
            >
                {children}
            </SwiperReact>

            <div className="custom-swiper-button-next shadow z-10 w-10 h-10 absolute -right-5 top-1/2 bg-white rounded-full cursor-pointer flex items-center justify-center transform -translate-y-1/2">
                <IconChevronRight className="text-black" />
                <span className="sr-only">Next</span>
            </div>

            <div className="custom-swiper-button-prev shadow z-10 w-10 h-10 absolute -left-5 top-1/2 bg-white rounded-full cursor-pointer flex items-center justify-center transform -translate-y-1/2">
                <IconChevronLeft className="text-black" />
                <span className="sr-only">Prev</span>
            </div>
        </div>
    );
};

export default Swiper;
