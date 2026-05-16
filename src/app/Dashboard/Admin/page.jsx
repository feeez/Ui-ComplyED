import Sidebar from "@/components/Utils/Sidebar";
import AdminDashboardView from "@/components/Dashboard/admin/DashboardView";

export const metadata = {
  title: "Admin Dashboard — ComplyED",
  description: "Admin overview and system activity",
};

export default function AdminPage() {
  return (
    <Sidebar role="admin">
      <AdminDashboardView />
    </Sidebar>
  );
}
