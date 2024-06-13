import { IconZoomCheck } from "@tabler/icons-react";
import GalleryViewer from "components/GalleryViewer.tsx";
import { Room } from "interfaces/room";

import React from "react";

const RoomCard: React.FC<Room> = (props) => {
    const { name, price, photos, conveniences } = props;

    return (
        <div className="grid grid-cols-2">
            <div className="col-span-1 relative">
                <div className="animate-bounce absolute top-0 left-0 text-xl font-bold">
                    <span className=" before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-sky relative inline-block">
                        <span className="relative text-white">UAH {price}</span>
                    </span>
                </div>

                <GalleryViewer photos={photos} />
            </div>
            <div className="col-span-1">
                <h2 className="text-2xl font-bold mb-4">{name}</h2>
                <div className="flex items-center space-x-4 mb-4">
                    <span>Апартаменти повністю</span>
                    <span>70 кв. м</span>
                    <span>Міні-кухня</span>
                </div>
                <div className="flex items-center flex-wrap gap-2 mb-4 text-sm">
                    {conveniences.map((convenience) => (
                        <div className="flex items-center">
                            <IconZoomCheck className="mr-1" /> {convenience.name}
                        </div>
                    ))}
                </div>
                <div className="mb-4 flex flex-col gap-2">
                    <p>
                        <strong>Розмір апартаментів:</strong> 70 м<sup>2</sup>
                    </p>
                    <p>
                        <strong>Зручні ліжка (оцінка 9)</strong>
                    </p>
                    <p>
                        <strong>Ванні кімнати:</strong> 1
                    </p>
                </div>
                <div className="mb-4 text-sm">
                    <p>
                        This apartment's special feature is the sauna. Featuring a private entrance, this
                        air-conditioned apartment comprises 1 living room, 2 separate bedrooms and 2 bathrooms
                        with a walk-in shower and a bidet. In the kitchenette, guests will find a stovetop, a
                        refrigerator, kitchenware and a microwave. The apartment also provides a flat-screen
                        TV, a tea and coffee maker, a seating area, a dining area as well as garden views. The
                        unit offers 7 beds.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;
