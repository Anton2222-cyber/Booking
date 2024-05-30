import BannerLoginAdvantages from "components/BannerLoginAdvantages.tsx";
import Discount from "components/Discount.tsx";
import Hero from "components/Hero.tsx";
import HousingTypeSearch from "components/HousingTypeSearch.tsx";
import NextTripSearchBanner from "components/NextTripSearchBanner.tsx";
import PopularAccommodations from "components/PopularAccommodations.tsx";
import QuickTripPlanner from "components/QuickTripPlanner.tsx";
import { motion } from "framer-motion";
import { leftToRightMotion, rightToLightMotion, topToBottomMotion } from "motion/index.ts";

import React from "react";

const blocks: React.ReactNode[] = [
    <QuickTripPlanner />,
    <HousingTypeSearch />,
    <PopularAccommodations />,
    <NextTripSearchBanner />,
    <BannerLoginAdvantages />,
];

const HomePage = () => {
    return (
        <div className="overflow-hidden">
            <motion.div
                initial={"hidden"}
                animate={"visible"}
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
            >
                <Discount />
            </motion.div>

            {blocks.map((block) => (
                <motion.div
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

            {/*<QuickTripPlanner />*/}
            {/*<HousingTypeSearch />*/}
            {/*<PopularAccommodations />*/}
            {/*<NextTripSearchBanner />*/}
            {/*<BannerLoginAdvantages />*/}
        </div>
    );
};

export default HomePage;
