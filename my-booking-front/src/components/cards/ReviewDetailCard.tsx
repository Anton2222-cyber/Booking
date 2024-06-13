import { IconBed, IconCalendar, IconUsers } from "@tabler/icons-react";
import { Review } from "interfaces/review";
import { API_URL } from "utils/getEnvData.ts";
import { getRandomColor } from "utils/getRandomColor.ts";
import { getRatingDescription } from "utils/getRating.ts";

import React from "react";

const ReviewDetailCard: React.FC<Review> = (props) => {
    const { user, score, photos, description } = props;

    return (
        <div className="border-t border-b border-lightgray/20 py-10 max-w-4xl mx-auto my-4">
            <div className="flex">
                <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center">
                        {user.photo ? (
                            <img
                                src={`${API_URL}/images/200_${user.photo}`}
                                alt={user.firstName}
                                className="rounded-full w-8 h-8"
                            />
                        ) : (
                            <div
                                className="rounded-full w-12 h-12 flex items-center justify-center text-white font-bold"
                                style={{ backgroundColor: getRandomColor() }}
                            >
                                {user.firstName.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className="font-bold ml-2 text-sm">{user.firstName}</div>
                    </div>

                    <div className="flex items-center text-xs mt-4 text-gray">
                        <IconBed size={16} className="mr-4" />
                        <span className="underline hover:cursor-pointer">Класичний двомісний номер</span>
                    </div>
                    <div className="flex items-center text-xs mt-4 text-gray">
                        <IconCalendar size={16} className="mr-4" />
                        <span>3 ночі · жовтень 2022</span>
                    </div>
                    <div className="flex items-center text-xs mt-4 text-gray">
                        <IconUsers size={16} className="mr-4" />
                        <span>Сім'я</span>
                    </div>
                </div>
                <div className="flex-1 ml-8">
                    <div className="flex justify-between items-center mb-4">
                        <div className="font-bold text-xl">{getRatingDescription(score)}</div>
                        <div className="bg-blue text-white text-sm font-main font-bold rounded-md w-8 h-8 flex items-center justify-center">
                            {score.toFixed(1)}
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex items-start mb-2 ">
                            <div className="text-sm text-main text-gray">{description}</div>
                        </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                        {Array.isArray(photos) &&
                            photos.map((photo, index) => (
                                <img
                                    key={index}
                                    src={`${API_URL}/images/200_${photo.name}`}
                                    alt={`photo-${index}`}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ReviewDetailCard;
