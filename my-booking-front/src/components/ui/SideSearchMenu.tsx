import { IconCalendar, IconHelp, IconSearch, IconUserFilled } from "@tabler/icons-react";
import SelectPerson from "components/SelectPerson.tsx";
import { Button } from "components/ui/Button.tsx";
import { Input } from "components/ui/Input.tsx";
import Label from "components/ui/Label.tsx";

import { useState } from "react";

const SideSearchMenu = () => {
    const [adults, setAdults] = useState<number>(1);
    const [rooms, setRooms] = useState<number>(1);
    const [children, setChildren] = useState<number>(0);

    return (
        <div className="bg-yellow rounded-md p-4">
            <Label variant="subtitle" className="text-black text-xl">
                Шукати
            </Label>
            <Label className="pt-2" variant="small">
                Місце / назва помешкання:
            </Label>
            <div className="relative flex-grow">
                <label
                    htmlFor="destination"
                    className="absolute h-full top-0 left-0 flex items-center justify-center px-2"
                >
                    <IconSearch className="text-lightgray w-4 h-4" />
                </label>
                <Input variant="withIcon" id="destination" className="py-1 font-normal" />
            </div>
            <Label className="pt-2" variant="small">
                Дата заїзду:
            </Label>
            <div className="relative flex-grow">
                <label
                    htmlFor="destination"
                    className="absolute h-full top-0 left-0 flex items-center justify-center px-2"
                >
                    <IconCalendar className="text-lightgray w-4 h-4" />
                </label>
                <Input variant="withIcon" id="destination" className="py-1 font-normal" />
            </div>
            <Label className="pt-2" variant="small">
                Дата виїзду:
            </Label>
            <div className="relative flex-grow">
                <label
                    htmlFor="destination"
                    className="absolute h-full top-0 left-0 flex items-center justify-center px-2"
                >
                    <IconCalendar className="text-lightgray w-4 h-4" />
                </label>
                <Input variant="withIcon" id="destination" className="py-1 font-normal" />
            </div>
            <div className="pt-2 gap-1 flex items-center justify-between">
                <input id="allRooms" type="checkbox" />
                <Label className="flex-grow" htmlFor="allRooms" variant="small">
                    Спершу помешкання повністю
                </Label>
                <IconHelp />
            </div>
            <div className="pt-2 gap-1 flex items-center justify-between">
                <input id="inJob" type="checkbox" />
                <Label className="flex-grow" htmlFor="inJob" variant="small">
                    Я подорожую у справах
                </Label>
                <IconHelp />
            </div>

            <div className="relative bg-white rounded-md  border border-white hover:border-yellow">
                <div className="absolute h-full top-0 left-0 flex items-center justify-center px-2">
                    <IconUserFilled className="text-lightgray z-50" />
                </div>
                <SelectPerson
                    adults={adults}
                    children={children}
                    rooms={rooms}
                    setAdults={setAdults}
                    setChildren={setChildren}
                    setRooms={setRooms}
                />
            </div>

            <div className="flex items-center justify-center pt-2">
                <Button className="w-full">Шукати</Button>
            </div>
        </div>
    );
};

export default SideSearchMenu;
