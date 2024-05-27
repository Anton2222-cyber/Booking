import { IconCalendar, IconHelp, IconSearch, IconUserFilled } from "@tabler/icons-react";
import SelectPerson from "components/SelectPerson.tsx";
import { Button } from "components/ui/Button.tsx";
import { Input } from "components/ui/Input.tsx";
import Label from "components/ui/Label.tsx";
import { useLocation, useNavigate } from "react-router-dom";

import { useState } from "react";

const SideSearchMenu = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const defaultDestination = queryParams.get("destination") || "";

    const [destination, setDestination] = useState<string>(defaultDestination || "");
    const [adults, setAdults] = useState<number>(1);
    const [rooms, setRooms] = useState<number>(1);
    const [children, setChildren] = useState<number>(0);
    const navigate = useNavigate();

    const handleSearch = () => {
        console.log("click");

        if (destination.length < 3) {
            return;
        }

        const queryParams = new URLSearchParams({
            destination,
        });

        navigate(`/search-results?${queryParams.toString()}`);
    };

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
                <Input
                    onChange={(e) => setDestination(e.target.value)}
                    value={destination}
                    variant="withIcon"
                    id="destination"
                    className="py-1 font-normal"
                />
            </div>
            <Label className="pt-2" variant="small">
                Дата заїзду:
            </Label>
            <div className="relative flex-grow">
                <label
                    htmlFor="checkin"
                    className="absolute h-full top-0 left-0 flex items-center justify-center px-2"
                >
                    <IconCalendar className="text-lightgray w-4 h-4" />
                </label>
                <Input variant="withIcon" id="checkin" className="py-1 font-normal" />
            </div>
            <Label className="pt-2" variant="small">
                Дата виїзду:
            </Label>
            <div className="relative flex-grow">
                <label
                    htmlFor="checkout"
                    className="absolute h-full top-0 left-0 flex items-center justify-center px-2"
                >
                    <IconCalendar className="text-lightgray w-4 h-4" />
                </label>
                <Input variant="withIcon" id="checkout" className="py-1 font-normal" />
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
            <div className="relative bg-white rounded-md border border-white hover:border-yellow">
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
                <Button onClick={handleSearch} className="w-full">
                    Шукати
                </Button>
            </div>
        </div>
    );
};

export default SideSearchMenu;
