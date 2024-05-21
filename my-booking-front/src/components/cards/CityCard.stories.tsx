import { Meta } from "@storybook/react";
import CityCard from "components/cards/CityCard.tsx";

const meta: Meta<typeof CityCard> = {
    component: CityCard,
};

export default meta;
export const Default = {
    args: {
        imageSrc: "https://picsum.photos/200/300",
        cityName: "Київ",
        geolocation: 50,
    },
};
