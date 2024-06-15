import logo1 from "assets/footer01.png";
import logo2 from "assets/footer02.png";
import logo3 from "assets/footer03.png";
import logo4 from "assets/footer04.png";
import logo5 from "assets/footer05.png";
import { animate, motion, useMotionValue } from "framer-motion";
import useMeasure from "react-use-measure";

import { useEffect, useState } from "react";

const logos = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo1,
    logo2,
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
];

const LogoCarousel = () => {
    const [ref, { width }] = useMeasure();
    const [duration, setDuration] = useState<number>(40);
    const [mustFinish, setMustFinish] = useState<boolean>(false);
    const [rerender, setRerender] = useState<boolean>(false);

    const xTransition = useMotionValue(0);

    useEffect(() => {
        let controls;
        let finalPosition = -width / 2 - 8;

        if (mustFinish) {
            controls = animate(xTransition, [xTransition.get(), finalPosition], {
                ease: "linear",
                duration: duration * (1 - xTransition.get() / finalPosition),
                onComplete: () => {
                    setMustFinish(false);
                    setRerender(!rerender);
                },
            });
        } else {
            controls = animate(xTransition, [0, finalPosition], {
                ease: "linear",
                repeat: Infinity,
                duration: duration,
                repeatType: "loop",
                repeatDelay: 0,
            });
        }

        return controls?.stop;
    }, [xTransition, width, duration, rerender]);

    return (
        <motion.div
            className="absolute left-0 flex gap-4"
            style={{ x: xTransition }}
            ref={ref}
            onHoverStart={() => {
                setMustFinish(true);
                setDuration(80);
            }}
            onHoverEnd={() => {
                setMustFinish(true);
                setDuration(40);
            }}
        >
            {[...logos, ...logos].map((image, index) => (
                <div
                    key={index}
                    className="relative overflow-hidden min-w-[200px] flex justify-center items-center"
                >
                    <img key={index} className="object-cover" src={image} alt="logo" />
                </div>
            ))}
        </motion.div>
    );
};

export default LogoCarousel;
