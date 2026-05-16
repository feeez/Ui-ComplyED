import Sidebar from "@/components/Utils/Sidebar";
import HistoryView from "@/components/History/HistoryView";

export const metadata = {
  title: "Document History — ComplyED",
  description: "View all your uploaded compliance documents",
};

export default function HistoryPage() {
  return (
    <Sidebar role="user">
      <HistoryView />
    </Sidebar>
  );
}
