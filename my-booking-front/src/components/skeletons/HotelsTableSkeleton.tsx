const HotelsTableSkeleton = () => {
    return (
        <table className="text-black animate-pulse">
            <tbody className="bg-white">
                {[...Array(5)].map((_, index) => (
                    <tr key={index} className="w-full py-3 text-sm">
                        <td className="whitespace-nowrap py-3 pr-3">
                            <div className="flex items-center gap-3">
                                <div className="w-32 h-20 bg-gray/20 rounded-lg"></div>
                                <div className="w-32 h-6 bg-gray/20 rounded"></div>
                            </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                            <div className="w-48 h-6 bg-gray/20 rounded"></div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                            <div className="w-24 h-6 bg-gray/20 rounded"></div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                            <div className="w-24 h-6 bg-gray/20 rounded"></div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                            <div className="w-8 h-6 bg-gray/20 rounded"></div>
                        </td>
                        <td className="whitespace-nowrap py-3 px-3">
                            <div className="flex justify-end gap-3">
                                <div className="w-32 h-9 bg-gray/20 rounded"></div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default HotelsTableSkeleton;
