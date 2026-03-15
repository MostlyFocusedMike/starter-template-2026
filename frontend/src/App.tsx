import MainHeader from "./components/MainHeader";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Error404Page from "./pages/Error404Page";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import { AuthGate } from "./lib/AuthGate";

function App() {
  return (
    <>
      <MainHeader />
      <main>
        <AuthGate>
          <Routes>
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            <Route path="/not-found" element={<Error404Page />} />
            <Route path="/" element={<HomePage />} />

            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </AuthGate>
      </main>
    </>
  )
}

export default App
