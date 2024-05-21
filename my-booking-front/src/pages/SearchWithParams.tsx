import Discount from "components/Discount.tsx";
import Label from "components/ui/Label.tsx";

const SearchWithParamsPage = () => {
    return (
        <div className="container mx-auto mt-5 grid grid-cols-4 gap-5">
            <div className="col-span-1">
                <div className="bg-yellow rounded-md p-4">
                    <Label variant="subtitle" className="text-black text-xl">
                        Шукати
                    </Label>
                </div>
            </div>
            <div className="col-span-3 h-screen">
                <Discount isFullWidth={true} />
            </div>
        </div>
    );
};

export default SearchWithParamsPage;
