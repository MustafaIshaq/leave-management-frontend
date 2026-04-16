import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import LeaveRequestsPageContent from "@/components/leaves/LeaveRequestsPageContent";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function LeaveRequestsPage() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN", "DIRECTOR"]}>
      <Navbar />

      <main className="min-h-screen p-6">
        <LeaveRequestsPageContent />
      </main>

      <Footer />
    </ProtectedRoute>
  );
}