import AuthFooter from "components/AuthFooter.tsx";
import AuthHeader from "components/AuthHeader.tsx";
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
