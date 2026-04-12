import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function ProfilePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen p-6">
        <h1 className="mb-4 text-2xl font-bold">My Details</h1>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-600">
            This is the profile page. Later, user details will be shown here.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}