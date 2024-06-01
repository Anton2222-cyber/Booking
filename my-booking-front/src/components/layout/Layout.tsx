import BottomNavigation from "components/blocks/BottomNavigation.tsx";
import Footer from "components/blocks/Footer.tsx";
import Header from "components/blocks/Header.tsx";
import Subscribe from "components/blocks/Subscribe.tsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <BottomNavigation />
            <Subscribe />
            <Footer />
        </>
    );
};

export default Layout;
