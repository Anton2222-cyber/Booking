import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "store/index.ts";
import { getToken } from "store/slice/userSlice.ts";
import { checkToken } from "utils/checkToken.ts";

const ProtectedRoute = () => {
    const location = useLocation();
    const token = useAppSelector(getToken);

    return checkToken(token) ? <Outlet /> : <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
