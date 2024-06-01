import Discount from "components/blocks/Discount.tsx";
import Hero from "components/blocks/Hero.tsx";
import HousingTypes from "components/blocks/HousingTypes.tsx";
import LoginAdvantages from "components/blocks/LoginAdvantages.tsx";
import NextTrip from "components/blocks/NextTrip.tsx";
import PopularHotels from "components/blocks/PopularHotels.tsx";
import QuickTripPlanner from "components/blocks/QuickTripPlanner.tsx";
import { motion } from "framer-motion";
import { leftToRightMotion, rightToLightMotion, topToBottomMotion } from "motion/index.ts";

import React from "react";

const blocks: React.ReactNode[] = [
    <QuickTripPlanner />,
    <HousingTypes />,
    <PopularHotels />,
    <NextTrip />,
    <LoginAdvantages />,
];

const HomePage = () => {
    return (
        <div className="overflow-hidden">
            <motion.div
                initial={"hidden"}
                animate={"visible"}
                className="relative z-0"
                transition={{
                    duration: 1,
                    ease: "easeInOut",
                }}
                variants={rightToLightMotion}
            >
                <Hero
                    title={"Візьміть із собою всю коробку з іграшками"}
                    subtitle={"Розслабтеся в будинку для відпочинку"}
                    isButton={true}
                    path={"/search-accommodation"}
                    img="bg-hero-home"
                />
            </motion.div>

            <motion.div
                initial={"hidden"}
                animate={"visible"}
                transition={{
                    duration: 1,
                    ease: "easeInOut",
                }}
                variants={leftToRightMotion}
                className="relative -z-10"
            >
                <Discount />
            </motion.div>

            {blocks.map((block, index) => (
                <motion.div
                    key={index}
                    className="card-container"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <motion.div className="card" variants={topToBottomMotion}>
                        {block}
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
};

export default HomePage;
