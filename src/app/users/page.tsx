import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import UsersPageContent from "@/components/users/UsersPageContent";

export default function UsersPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen p-6">
        <UsersPageContent />
      </main>

      <Footer />
    </>
  );
}