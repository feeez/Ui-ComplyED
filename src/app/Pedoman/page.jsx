import Sidebar from "@/components/Utils/Sidebar";
import PedomanView from "@/components/Pedoman/PedomanView";

export const metadata = {
  title: "Pedoman Dokumen — ComplyED",
  description: "Lihat pedoman kepatuhan dokumen per jenis",
};

export default function PedomanPage() {
  return (
    <Sidebar role="user">
      <PedomanView />
    </Sidebar>
  );
}
