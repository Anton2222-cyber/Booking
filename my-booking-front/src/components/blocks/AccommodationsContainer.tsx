import React from "react";

interface IAccommodationBlockProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

const AccommodationsContainer: React.FC<IAccommodationBlockProps> = (props) => {
    const { title, subtitle, children } = props;

    return (
        <div className="mt-10 container mx-auto ">
            <div className=" border-y border-gray/20 overflow-hidden pt-5 px-6">
                <h1 className="font-bold text-black mb-1">{title}</h1>
                {subtitle && <h2 className="text-sm  text-gray mb-1">{subtitle}</h2>}

                {children}
            </div>
        </div>
    );
};

export default AccommodationsContainer;
