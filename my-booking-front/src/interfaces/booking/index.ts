import { PaginationOptions } from "interfaces/index.ts";
import { Room } from "interfaces/room";

export interface Booking {
    id: number;
    from: string;
    to: string;
    room: Room;
}

export interface CreateBooking {
    from: string;
    to: string;
    roomId: number;
}

export interface GetBookingsPageRequest extends PaginationOptions {
    from?: string;
    minFrom?: string;
    maxFrom?: string;
    to?: string;
    minTo?: string;
    maxTo?: string;
    roomId?: number;
}
