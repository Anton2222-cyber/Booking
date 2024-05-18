import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import Counter from "components/ui/Counter.tsx";

import { Fragment, useState } from "react";

const SelectPerson = () => {
    const [adults, setAdults] = useState<number>(1);
    const [rooms, setRooms] = useState<number>(1);
    const [children, setChildren] = useState<number>(0);

    return (
        <Popover className="relative h-full">
            <PopoverButton className="outline-none  h-full">
                <div className="pe-2 bg-white outline-none text-sm w-full placeholder:text-lightgray font-bold rounded-md ps-10">
                    1 дорослий · 0 дітей · 1 номер
                </div>
            </PopoverButton>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <PopoverPanel className="absolute right-0 z-10 mt-2 flex w-screen max-w-max">
                    <div className="flex-auto overflow-hidden rounded-md bg-white text-sm shadow-lg">
                        <div>
                            <div className="flex flex-col gap-5 p-4">
                                <div className="flex items-center justify-between gap-20">
                                    <div className="font-semibold">Дорослі</div>
                                    <Counter
                                        maxValue={30}
                                        minValue={1}
                                        counter={adults}
                                        setCounter={setAdults}
                                    />
                                </div>
                                <div className="flex items-center justify-between gap-20">
                                    <div>
                                        <h1 className="font-semibold ">Діти</h1>
                                        <p className=" text-gray-500 text-lightgray">0-17 років</p>
                                    </div>
                                    <Counter
                                        maxValue={20}
                                        minValue={0}
                                        counter={children}
                                        setCounter={setChildren}
                                    />
                                </div>
                                <div className="flex items-center justify-between gap-20">
                                    <div className="font-semibold ">Номери</div>
                                    <Counter
                                        maxValue={30}
                                        minValue={1}
                                        counter={rooms}
                                        setCounter={setRooms}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </PopoverPanel>
            </Transition>
        </Popover>
    );
};

export default SelectPerson;
