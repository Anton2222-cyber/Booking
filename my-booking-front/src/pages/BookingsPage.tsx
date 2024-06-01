import BookingHotelCard from "components/cards/BookingHotelCard.tsx";
import Label from "components/ui/Label.tsx";
import { useGetPageBookingsQuery } from "services/booking.ts";

const BookingsPage = () => {
    const { data } = useGetPageBookingsQuery({
        pageSize: 10,
    });

    return (
        <div className="container mx-auto mt-5 flex flex-col">
            <Label variant="extra">Бронювання й поїздки</Label>

            <div className="flex flex-col gap-3">
                {data?.data.map((booking) => <BookingHotelCard key={booking.id} {...booking} />)}
            </div>
        </div>
    );
};

export default BookingsPage;
