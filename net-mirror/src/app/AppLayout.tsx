import { Navigate, Outlet } from "react-router-dom";
import Header from "../shared/components/Header";
import { useAuthStore } from "../store/useAuthStore";

export default function AppLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}