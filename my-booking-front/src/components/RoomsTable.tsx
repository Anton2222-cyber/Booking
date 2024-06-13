import { IconCaretRightFilled, IconUserFilled } from "@tabler/icons-react";
import NotFoundResult from "components/NotFoundResult.tsx";
import RoomCard from "components/cards/RoomCard.tsx";
import { Button } from "components/ui/Button.tsx";
import Modal from "components/ui/Modal.tsx";
import { Room } from "interfaces/room";
import { useCreateBookingMutation } from "services/booking.ts";
import { convertFromTimestamptz, convertToTimestamptz } from "utils/dateFormat.ts";

import React, { useState } from "react";

interface RoomsTableProps {
    from: string;
    to: string;
    rooms: Room[];
}

const RoomsTable: React.FC<RoomsTableProps> = (props) => {
    let { rooms, to, from } = props;
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

    const [createBooking] = useCreateBookingMutation();

    const handleCreateBooking = (roomId: number) => {
        const currentDate = new Date();
        const fromDate = convertFromTimestamptz(from);

        if (fromDate < currentDate) {
            const futureDate = new Date(currentDate);
            futureDate.setMinutes(futureDate.getMinutes() + 15);
            from = convertToTimestamptz(futureDate);
        }

        createBooking({ roomId: roomId, from: from, to: to });
    };

    const handleOpenModal = (room: Room) => {
        setSelectedRoom(room);
        setShowModal(true);
    };

    return (
        <>
            <table className="table-auto w-full ">
                <thead className="bg-blue text-sm font-bold text-white h-12">
                    <tr>
                        <th className="p-2 text-start w-1/3">Тип номера</th>
                        <th className="p-2 text-start">Кількість гостей</th>
                        <th className="p-2 text-start">Ціна за ніч</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                        <tr className="border-b border-sky" key={room.id}>
                            <td className=" text-sm font-bold text-sky underline">
                                <button
                                    onClick={() => handleOpenModal(room)}
                                    className="flex items-center  gap-1"
                                >
                                    <div>
                                        <IconCaretRightFilled className="text-yellow" />
                                    </div>
                                    <p className="text-start line-clamp-1 pe-2">{room.name}</p>
                                </button>
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
                                <Button
                                    size="sm"
                                    onClick={() => handleCreateBooking(room.id)}
                                    className="text-xs w-full"
                                >
                                    Забронювати
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {rooms.length === 0 && <NotFoundResult text="Вибачте, доступних номерів немає!" />}

            <Modal open={showModal} close={() => setShowModal(false)}>
                {selectedRoom && <RoomCard {...selectedRoom} />}
            </Modal>
        </>
    );
};

export default RoomsTable;
