import BottomNavigation from "components/BottomNavigation.tsx";
import Footer from "components/Footer.tsx";
import Header from "components/Header.tsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <BottomNavigation />
            <Footer />
        </>
    );
};

export default Layout;
