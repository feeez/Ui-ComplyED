import Sidebar from "@/components/Utils/Sidebar";
import RulesView from "@/components/Rules/RulesView";

export const metadata = {
  title: "Compliance Rules — ComplyED",
  description: "Manage compliance validation rules",
};

export default function RulesPage() {
  return (
    <Sidebar role="admin">
      <RulesView />
    </Sidebar>
  );
}
