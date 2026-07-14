import { LoginPage } from "@/features/auth/pages/Login";
import { Route, Routes } from "react-router-dom";
export default function AppRoutes(){
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
}