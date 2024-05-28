import { IconCaretRightFilled, IconUserFilled } from "@tabler/icons-react";
import { Button } from "components/ui/Button.tsx";
import { Room } from "interfaces/room";

import React from "react";

interface RoomsTableProps {
    rooms: Room[];
}
const RoomsTable: React.FC<RoomsTableProps> = (props) => {
    const { rooms } = props;

    return (
        <table className="table-auto w-full ">
            <thead className="bg-blue text-sm font-bold text-white ">
                <tr>
                    <th className="p-2 text-start">Тип номера</th>
                    <th className="p-2 text-start">Кількість гостей</th>
                    <th className="p-2 text-start">Ціна за ніч</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {rooms.map((room) => (
                    <tr className="border-b border-sky" key={room.id}>
                        <td className=" text-sm font-bold text-sky underline">
                            <div className="flex items-center gap-1">
                                <IconCaretRightFilled className="text-yellow" />
                                {room.name}
                            </div>
                        </td>
                        <td>
                            <div className="flex items-center">
                                {Array.from({ length: room.adultPlaces }, (_, i) => (
                                    <IconUserFilled key={i} className="text-black w-4" />
                                ))}
                                {room.childrenPlaces ? " + " : ""}
                                {Array.from({ length: room.childrenPlaces }, (_, i) => (
                                    <IconUserFilled key={i} className="text-black w-3" />
                                ))}
                            </div>
                        </td>

                        <td className="p-2">{room.price} ₴</td>
                        <td className="p-2">
                            <Button size="sm" className="text-xs w-full">
                                Забронювати
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default RoomsTable;
