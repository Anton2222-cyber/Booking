import NotFoundResult from "components/NotFoundResult.tsx";
import BookingHotelCard from "components/cards/BookingHotelCard.tsx";
import BookingHotelCardSkeleton from "components/skeletons/BookingHotelCardSkeleton.tsx";
import Label from "components/ui/Label.tsx";
import { useGetPageBookingsQuery } from "services/booking.ts";

const MyBookingsPage = () => {
    const { data: bookingData, isLoading, isError } = useGetPageBookingsQuery({});

    return (
        <div className="container mx-auto mt-5 flex flex-col gap-5">
            <Label variant="extra">Бронювання й поїздки</Label>

            <div className="flex flex-col gap-3">
                {isLoading &&
                    Array.from({ length: 3 }).map((_, index) => <BookingHotelCardSkeleton key={index} />)}

                {(isError || bookingData?.data.length === 0) && (
                    <NotFoundResult text="У вас немає бронювань" />
                )}

                {bookingData?.data.map((booking) => <BookingHotelCard key={booking.id} {...booking} />)}
            </div>
        </div>
    );
};

export default MyBookingsPage;
