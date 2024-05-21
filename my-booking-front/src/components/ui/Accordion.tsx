import { IconChevronDown } from "@tabler/icons-react";

import React from "react";

interface IAccordionProps {
    title: string;
    data: string;
    isOpen: boolean;
    toggleAccordion: () => void;
}
const Accordion: React.FC<IAccordionProps> = (props) => {
    const { title, toggleAccordion, isOpen, data } = props;
    return (
        <div className="border border-gray/20 rounded-lg overflow-hidden hover:bg-lightgray/10">
            <button
                className="w-full p-4 text-left text-sm bg-gray-200 hover:bg-gray-300 transition duration-300"
                onClick={toggleAccordion}
            >
                {title}
                <span
                    className={`float-right transform ${isOpen ? "rotate-180" : "rotate-0"} transition-transform duration-300`}
                >
                    <IconChevronDown />
                </span>
            </button>
            {isOpen && <div className="p-4 py-2 bg-white text-sm">{data}</div>}
        </div>
    );
};

export default Accordion;
