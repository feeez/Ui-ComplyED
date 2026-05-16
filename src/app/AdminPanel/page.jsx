import Sidebar from "@/components/Utils/Sidebar";
import AdminPanelView from "@/components/AdminPanel/AdminPanelView";

export const metadata = {
  title: "User Management — ComplyED",
  description: "Manage user accounts and permissions",
};

export default function AdminPanelPage() {
  return (
    <Sidebar role="admin">
      <AdminPanelView />
    </Sidebar>
  );
}
