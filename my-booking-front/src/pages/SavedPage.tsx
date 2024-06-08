import Label from "components/ui/Label.tsx";
import { motion, useMotionValue, useTransform } from "framer-motion";

import { useState } from "react";

const SavedPage = () => {
    const [isChecked, setIsChecked] = useState(true);
    const pathLength = useMotionValue(0);
    const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

    return (
        <div className="container mx-auto mt-5 flex flex-col gap-5">
            <Label variant="extra">Бронювання й поїздки</Label>
            <motion.div
                animate={{
                    scale: isChecked ? 1 : 0.8,
                    backgroundColor: isChecked ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.5)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onTap={() => setIsChecked(!isChecked)}
            >
                <svg>
                    <motion.path
                        d="M38 74.707l24.647 24.646L116.5 45.5"
                        fill="transparent"
                        strokeWidth="20"
                        stroke="#39e"
                        strokeLinecap="round"
                        initial={{ pathLength: 0.9, opacity: 1 }}
                        animate={{ pathLength: isChecked ? 0.9 : 0 }}
                        style={{ pathLength, opacity }}
                    />
                </svg>
            </motion.div>
        </div>
    );
};

export default SavedPage;
