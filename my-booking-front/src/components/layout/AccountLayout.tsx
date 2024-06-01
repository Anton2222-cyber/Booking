import AuthFooter from "components/blocks/AuthFooter.tsx";
import AuthHeader from "components/blocks/AuthHeader.tsx";
import { Outlet } from "react-router-dom";

const AccountLayout = () => {
    return (
        <>
            <AuthHeader />
            <Outlet />
            <AuthFooter />
        </>
    );
};

export default AccountLayout;
