import BottomNavigation from "components/BottomNavigation.tsx";
import Footer from "components/Footer.tsx";
import Header from "components/Header.tsx";
import SubscribeForm from "components/SubscribeForm.tsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <BottomNavigation />
            <SubscribeForm />
            <Footer />
        </>
    );
};

export default Layout;
