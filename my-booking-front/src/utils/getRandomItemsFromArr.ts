import { City } from "interfaces/city";

export const getRandomCity = (arr: City[] | undefined) => {
    if (!arr) {
        return;
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex].country.id;
};
