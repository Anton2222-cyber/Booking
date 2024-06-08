import { Meta } from "@storybook/react";
import HotelTypeCard from "components/cards/HotelTypeCard.tsx";

const meta: Meta<typeof HotelTypeCard> = {
    component: HotelTypeCard,
};

export default meta;
export const Default = {
    args: {
        imageSrc:
            "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        title: "Village House",
    },
};
