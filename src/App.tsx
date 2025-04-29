import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import { DashboardLayout } from "./components/dashboard/dashboard-layout";
import { DashboardPage } from "./pages/dashboard";
import { PatientsPage } from "./pages/dashboard/patients";
import { SubscriptionsPage } from "./pages/dashboard/subscriptions";
import { DoctorsPage } from "./pages/dashboard/doctors";

function App() {
  return (
    <div className="font-primary">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="subscriptions" element={<SubscriptionsPage />} />
          <Route path="doctors" element={<DoctorsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
