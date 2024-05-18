import { IconMinus, IconPlus } from "@tabler/icons-react";

import React from "react";

interface ICounterProps {
    minValue: number;
    maxValue: number;
    counter: number;
    setCounter: (value: number) => void;
}

const Counter: React.FC<ICounterProps> = (props) => {
    const { minValue, maxValue, counter, setCounter } = props;

    const handleArrowChange = (value: number) => {
        const count = counter + value;

        if (count >= minValue && count <= maxValue) {
            setCounter(count);
        }
    };

    return (
        <div className="bg-white ">
            <div className="w-full flex justify-between items-center gap-x-1">
                <div className="flex items-center">
                    <button
                        type="button"
                        onClick={() => handleArrowChange(-1)}
                        className="border border-sky p-1 inline-flex justify-center items-center gap-x-2 text-sm font-medium bg-white text-sky disabled:opacity-50 disabled:pointer-events-none"
                    >
                        <IconMinus />
                    </button>
                    <input
                        className="outline-none font-main font-bold text-center w-10 p-0 bg-transparent border-0 text-gray-800"
                        type="number"
                        min={minValue}
                        max={maxValue}
                        value={counter}
                    />
                    <button
                        type="button"
                        className="border border-sky p-1 inline-flex justify-center items-center gap-x-2 text-sm font-medium bg-white text-sky disabled:opacity-50 disabled:pointer-events-none"
                        onClick={() => handleArrowChange(1)}
                    >
                        <IconPlus />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Counter;
