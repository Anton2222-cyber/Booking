import { Button } from "components/ui/Button.tsx";
import { Hotel } from "interfaces/hotel";
import { Link } from "react-router-dom";
import { API_URL } from "utils/getEnvData.ts";

import React from "react";

interface HotelsTableProps {
    hotels: Hotel[];
}

const HotelsTable: React.FC<HotelsTableProps> = (props) => {
    const { hotels } = props;

    return (
        <table className="text-black">
            <tbody className="bg-white">
                {hotels.map((hotel, index) => (
                    <tr
                        key={index}
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                        <td className="whitespace-nowrap py-3 pr-3">
                            <div className="flex items-center gap-3">
                                <img
                                    src={`${API_URL}/images/800_${hotel.photos[0].name}`}
                                    className="w-32 h-20 rounded-lg object-cover"
                                    alt={`profile picture`}
                                />
                                <Link
                                    to={`/hotel/${hotel.id}`}
                                    className="font-extrabold hover:text-sky hover:underline cursor-pointer"
                                >
                                    {hotel.name}
                                </Link>
                            </div>
                        </td>
                        <td className="whitespace-nowrap italic px-3 py-3">{hotel.type.name}</td>
                        <td className="whitespace-nowrap italic font-bold px-3 py-3">
                            {hotel.address.city.name}
                        </td>
                        <td className="whitespace-nowrap px-3 italic font-bold py-3">
                            {hotel.address.city.country.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                            <div className="bg-blue text-white text-sm font-main font-bold rounded-md rounded-bl-none w-8 h-8 flex items-center justify-center">
                                {hotel.rating.toFixed(1)}
                            </div>
                        </td>
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex justify-end gap-3">
                                <Link to={"/room/create"}>
                                    <Button size="sm" variant="primary">
                                        Додати кімнату
                                    </Button>
                                </Link>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default HotelsTable;
