import MainHeader from "./components/MainHeader";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Error404Page from "./pages/Error404Page";
import { useQuery } from "@tanstack/react-query"
import { getAllUsers } from "./api/user";
import type { User } from "./api/types";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const { data, isPending, isError, error } = useQuery<User[]>({
    queryKey: ['USERS'],
    queryFn: () => getAllUsers(),
  });

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <MainHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          <Route path="/not-found" element={<Error404Page />} />

          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </main>
    </>
  )
}

export default App
