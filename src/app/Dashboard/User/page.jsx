import Sidebar from "@/components/Utils/Sidebar";
import DashboardView from "@/components/Dashboard/user/DashboardView";

export const metadata = {
  title: "Dashboard — ComplyED",
  description: "Your compliance workspace overview",
};

export default function UserDashboardPage() {
  return (
    <Sidebar role="user">
      <DashboardView />
    </Sidebar>
  );
}
