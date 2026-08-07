import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/footer/footer.jsx";

const PublicLayout = () => (
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
);

export default PublicLayout;