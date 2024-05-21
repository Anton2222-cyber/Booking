import AccountFooter from "components/AccountFooter.tsx";
import AccountHeader from "components/AccountHeader.tsx";
import { Outlet } from "react-router-dom";

const AccountLayout = () => {
    return (
        <>
            <AccountHeader />
            <Outlet />
            <AccountFooter />
        </>
    );
};

export default AccountLayout;
