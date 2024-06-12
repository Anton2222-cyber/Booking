import { PaginationOptions } from "interfaces/index.ts";
import { Photo } from "interfaces/photo";
import { User } from "interfaces/user";

export interface Review {
    id: number;
    description: string;
    score: number;
    user: User;
    hotelId: number;
    photos?: Photo;
}

export interface CreateReview {
    description: string;
    score: number;
    hotelId: number;
    photos?: File[];
}

export interface GetReviewPageRequest extends PaginationOptions {
    description?: string;
    score?: number;
    minScore?: number;
    maxScore?: number;
    user?: User;
    hotelId?: number;
}
