import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Cabins from "./pages/Cabins";
import Bookings from "./pages/Bookings";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Checkin from "./pages/Checkin";
import AppLayout from "./ui/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import ProtecteedRoute from "./ui/ProtecteedRoute";
import { DarkModeContext } from "./ui/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    staleTime: 0,
  },
});

function App() {
  return (
    <DarkModeContext>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtecteedRoute>
                  <AppLayout />
                </ProtecteedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="account" element={<Account />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="booking/:id" element={<Booking />} />
              <Route path="checkin/:id" element={<Checkin />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<Users />} />
              <Route path="setting" element={<Settings />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" />
      </QueryClientProvider>
    </DarkModeContext>
  );
}

export default App;
