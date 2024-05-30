import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { IconBrandBooking, IconHeart, IconLogout } from "@tabler/icons-react";
import { Button } from "components/ui/Button.tsx";
import { User } from "interfaces/user";
import { useAppDispatch } from "store/index.ts";
import { logOut } from "store/slice/userSlice.ts";
import { API_URL } from "utils/getEnvData.ts";

import React, { Fragment } from "react";

const UserPanel: React.FC<User> = (props) => {
    const { photo, lastName, firstName } = props;
    const dispatch = useAppDispatch();

    return (
        <Popover className="relative">
            <PopoverButton className="h-12 px-3 py-2 outline-none bg-transparent text-white hover:bg-lightblue font-bold rounded-md gap-1">
                <div className="flex gap-2">
                    <img
                        className="h-8 w-8 rounded-full"
                        src={`${API_URL}/images/200_${photo}`}
                        alt="avatar"
                    />
                    <div className="flex flex-col">
                        <span className="text-start text-white text-sm">
                            {firstName} {lastName}
                        </span>
                        <span className="text-start text-yellow text-xs">Genius 1-го рівня</span>
                    </div>
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
                <PopoverPanel className="shadow-xl w-full bg-white py-1 rounded-md absolute right-0 mt-4 z-10 flex flex-col">
                    <Button
                        variant="underline"
                        className="w-full text-sm no-underline text-black hover:bg-gray/20 justify-start"
                        size="sm"
                    >
                        <IconBrandBooking />
                        Бронювання
                    </Button>

                    <Button
                        variant="underline"
                        className="w-full text-sm no-underline text-black hover:bg-gray/20 justify-start"
                        size="sm"
                    >
                        <IconHeart />
                        Збережене
                    </Button>

                    <Button
                        variant="underline"
                        onClick={() => dispatch(logOut())}
                        className="w-full text-sm no-underline text-black hover:bg-gray/20 justify-start"
                        size="sm"
                    >
                        <IconLogout />
                        Вийти
                    </Button>
                </PopoverPanel>
            </Transition>
        </Popover>
    );
};

export default UserPanel;
