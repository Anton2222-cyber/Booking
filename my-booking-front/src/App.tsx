import AccountLayout from "components/layout/AccountLayout.tsx";
import Layout from "components/layout/Layout.tsx";
import HomePage from "pages/Home.tsx";
import LoginPage from "pages/Login.tsx";
import SearchPage from "pages/Search.tsx";
import SearchWithParamsPage from "pages/SearchWithParams.tsx";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="search-accommodation" element={<SearchPage />} />
                <Route path="search-results" element={<SearchWithParamsPage />} />
            </Route>

            <Route path="/auth/" element={<AccountLayout />}>
                <Route path="login" element={<LoginPage />} />
            </Route>
        </Routes>
    );
}

export default App;
