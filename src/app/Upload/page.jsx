import Sidebar from "@/components/Utils/Sidebar";
import UploadView from "@/components/Upload/UploadView";

export const metadata = {
  title: "Upload Document — ComplyED",
  description: "Upload and analyze your compliance documents",
};

export default function UploadPage() {
  return (
    <Sidebar role="user">
      <UploadView />
    </Sidebar>
  );
}
