import { Button } from "components/ui/Button.tsx";

const bottomNavItems = [
    {
        label: "Місця",
        subItems: [
            { label: "Країни", to: "countries" },
            { label: "Регіони", to: "regions" },
            { label: "Міста", to: "cities" },
            { label: "Райони", to: "districts" },
            { label: "Аеропорти", to: "airports" },
            { label: "Готелі", to: "hotels" },
            { label: "Пам'ятки", to: "landmarks" },
        ],
    },
    {
        label: "Типи",
        subItems: [
            { label: "Приватні помешкання", to: "countries" },
            { label: "Апартаменти", to: "regions" },
            { label: "Курортні готелі", to: "cities" },
            { label: "Вілла", to: "districts" },
            { label: "Хостели", to: "airports" },
            { label: 'Помешкання типу "ліжко та сніданок"', to: "hotels" },
            { label: "Гостьові будинки", to: "landmarks" },
        ],
    },
    {
        label: "Деталі",
        subItems: [
            { label: "Унікальні помешкання", to: "countries" },
            { label: "Усі напрямки", to: "regions" },
            { label: "Усі напрямки перельотів", to: "cities" },
            { label: "Усі пункти прокату", to: "districts" },
            { label: "Усі напрямки для відпусток", to: "airports" },
            { label: "Відгуки", to: "hotels" },
            { label: "Дізнайтеся про проживання на місяць", to: "landmarks" },
            { label: "Сезонні та святкові пропозиції", to: "landmarks" },
            { label: "Traveller Review Awards", to: "landmarks" },
        ],
    },
    {
        label: "Для консультацій",
        subItems: [{ label: "Booking.com для туристичних консультантів", to: "countries" }],
    },

    {
        label: "Питання",
        subItems: [
            { label: "Коронавірус (COVID-19): питання та відповіді", to: "countries" },
            { label: "Про компанію Booking.com", to: "regions" },
            { label: "Служба підтримки", to: "cities" },
            { label: "Допомога партнерам", to: "districts" },
            { label: "Careers", to: "airports" },
            { label: "Ековідповідальність", to: "hotels" },
            { label: "Прес-центр", to: "landmarks" },
            { label: "Центр ресурсів з безпеки", to: "landmarks" },
            { label: "Для інвесторів", to: "landmarks" },
            { label: "Правила та умови", to: "airports" },
            { label: "Розв'язання суперечок", to: "airports" },
            { label: "Як ми працюємо", to: "airports" },
            { label: "Конфіденційність та положення про файли cookie", to: "airports" },
            { label: "Положення MSA", to: "airports" },
            { label: "Корпоративні контакти", to: "airports" },
            { label: "Рекомендації та скарги щодо вмісту", to: "airports" },
        ],
    },
];

const BottomNavigation = () => {
    return (
        <div className="bg-blue bg-cover mt-5">
            <div className="container flex items-center justify-center mx-auto py-4">
                <Button variant="transparent" size="sm" className="border border-white font-normal text-xs">
                    Зареєструвати своє помешкання
                </Button>
            </div>
            <hr className="border-t border-white" />
            <div className="container flex items-center justify-between mx-auto  ">
                <Button variant="underline" size="sm">
                    Версія для мобільних пристроїв
                </Button>
                <Button variant="underline" size="sm">
                    Ваш акаунт
                </Button>
                <Button variant="underline" size="sm">
                    Редагуйте своє бронювання онлайн
                </Button>
                <Button variant="underline" size="sm">
                    Служба підтримки
                </Button>
                <Button variant="underline" size="sm">
                    Станьте нашим афіліатом
                </Button>
                <Button variant="underline" size="sm">
                    Booking.com for Business
                </Button>
            </div>

            <div className="bg-white">
                <div className="container mx-auto py-4 grid grid-cols-5 gap-4">
                    {bottomNavItems.map((item) => (
                        <div key={item.label} className="col-span-1">
                            {item.subItems?.map((subItem) => (
                                <a
                                    key={subItem.label}
                                    href={`/${subItem.to}`}
                                    className="block py-1 text-xs text-sky hover:text-red"
                                >
                                    {subItem.label}
                                </a>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BottomNavigation;
