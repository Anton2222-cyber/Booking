import { Meta } from "@storybook/react";
import AccommodationSearchCard from "components/cards/AccommodationSearchCard.tsx";

const meta: Meta<typeof AccommodationSearchCard> = {
    component: AccommodationSearchCard,
};

export default meta;
export const Default = {
    args: {
        imageSrc:
            "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        name: "Colorful Cracovia Apartments",
        location: "The Location",
        rating: 8.5,
        numberOfReviews: 100,
    },
};
