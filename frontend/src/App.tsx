import MainHeader from "./lib/components/MainHeader";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Error404Page from "./pages/Error404Page";
// import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import { AuthGate } from "./lib/components/AuthGate";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <>
      <MainHeader />
      <main>
        <AuthGate>
          <Routes>
            {/* <Route path="/sign-up" element={<SignUpPage />} /> */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />


            <Route path="/" element={<HomePage />} />

            {/* admin routes */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

            <Route path="*" element={<Error404Page />} />
          </Routes>
        </AuthGate>
      </main>
    </>
  );
}

export default App;
