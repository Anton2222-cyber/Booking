import Layout from "components/layout/Layout.tsx";
import HomePage from "pages/Home.tsx";
import SearchPage from "pages/Search.tsx";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="search-accommodation" element={<SearchPage />} />
            </Route>
        </Routes>
    );
}

export default App;
