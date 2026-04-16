import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import MyLeavesPageContent from "@/components/leaves/MyLeavesPageContent";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function MyLeavesPage() {
  return (
    <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
      <Navbar />

      <main className="min-h-screen p-6">
        <MyLeavesPageContent />
      </main>

      <Footer />
    </ProtectedRoute>
  );
}