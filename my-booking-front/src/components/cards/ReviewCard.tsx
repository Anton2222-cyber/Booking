import { Review } from "interfaces/review";
import { API_URL } from "utils/getEnvData.ts";

import React from "react";

const ReviewCard: React.FC<Review> = (props) => {
    const { description, user, score } = props;

    return (
        <div className="w-full h-full max-w-xs mx-auto rounded-lg shadow-lg overflow-hidden flex flex-col gap-2 p-4">
            <div className="flex gap-2">
                <img
                    className="bg-yellow w-12 h-12 rounded-full object-cover"
                    src={`${API_URL}/images/800_${user.photo}`}
                    alt="avatar"
                />
                <div className="flex flex-col justify-center">
                    <p className="text-sm">
                        {user.firstName} {user.lastName}
                    </p>
                    <div className="bg-blue text-white text-xs font-main font-bold rounded-md rounded-bl-none w-6 h-6 flex items-center justify-center">
                        {score.toFixed(1)}
                    </div>
                </div>
            </div>

            <div className="text-xs">"{description}"</div>
        </div>
    );
};

export default ReviewCard;
