import { Variants } from "framer-motion";

export const leftToRightMotion = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
};
export const rightToLightMotion = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
};

export const topToBottomMotion: Variants = {
    offscreen: {
        y: 300,
        opacity: 0,
        zIndex: 0,
    },
    onscreen: {
        y: 0,
        zIndex: 10,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.5,
        },
    },
};
