import NotFoundImage from "assets/data-not-found.webp";
import { Link } from "react-router-dom";

import React from "react";

interface INotFoundResultProps {
    text: string;
}

const NotFoundResult: React.FC<INotFoundResultProps> = (props) => {
    const { text } = props;
    return (
        <div className="border bg-yellow/10 border-lightgray/20 rounded-md  overflow-hidden">
            <div className="m-4 ps-4 text-2xl text-black font-bold flex flex-col justify-between">
                <h1 className=" text-2xl text-center text-black font-bold  ">{text}</h1>
                <div className="flex items-center justify-center">
                    <img className="h-40 w-40" src={NotFoundImage} alt="Not Found Image" />
                </div>

                <Link to="/">
                    <p className="text-center text-blue text-sm cursor-pointer hover:underline font-bold">
                        Повернутися до головної
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default NotFoundResult;
