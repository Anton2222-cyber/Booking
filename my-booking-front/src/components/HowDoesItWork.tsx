import Accordion from "components/ui/Accordion.tsx";
import Label from "components/ui/Label.tsx";

import { useState } from "react";

const HowDoesItWork = () => {
    const [accordions, setAccordion] = useState([
        {
            key: 1,
            title: "Отримання ключів",
            data: `Ви зможете спілкуватися безпосередньо з господарем, щоб дізнатися про місце та спосіб отримання ключів. Можливо, ви зустрінетеся особисто або заберете їх у скриньці – все максимально просто для того, щоб ви заселилися в помешкання та розпочати свою незабутню подорож!`,
            isOpen: false,
        },
        {
            key: 2,
            title: "Зв'язок з господарем помешкання",
            data: `Ви завжди зможете зв’язатися з господарем, якщо у вас виникнуть питання щодо вашої майбутньої поїздки. Можливо, ви хочете повідомити час свого заїзду або надіслати особливий запит – скористайтеся постійними перевагами спілкування без клопотів.`,
            isOpen: false,
        },
        {
            key: 3,
            title: "Заїзд",
            data: `Можливо, ви зупинялися лише в готелях і не знаєте, як проходить реєстрація заїзду в апартаментах або помешканнях для відпустки. Не хвилюйтеся! Господарі помешкань надають усю необхідну вам інформацію.`,
            isOpen: false,
        },
    ]);

    const toggleAccordion = (key: number) => {
        const updatedAccordions = accordions.map((accord) => {
            if (accord.key === key) {
                return { ...accord, isOpen: !accord.isOpen };
            } else {
                return { ...accord, isOpen: false };
            }
        });

        setAccordion(updatedAccordions);
    };

    return (
        <div className="flex flex-col container mx-auto mt-5 gap-2">
            <Label variant="extra">Як це працює?</Label>{" "}
            {accordions.map((accordion) => (
                <Accordion
                    key={accordion.key}
                    title={accordion.title}
                    data={accordion.data}
                    isOpen={accordion.isOpen}
                    toggleAccordion={() => toggleAccordion(accordion.key)}
                />
            ))}
        </div>
    );
};

export default HowDoesItWork;
