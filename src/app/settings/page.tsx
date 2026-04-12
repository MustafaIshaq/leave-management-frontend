import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function SettingsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen p-6">
        {/* Page title */}
        <h1 className="mb-4 text-2xl font-bold">Settings</h1>

        {/* Simple content box */}
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-600">
            This is the settings page. Later, company settings and leave
            settings will be managed here.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}