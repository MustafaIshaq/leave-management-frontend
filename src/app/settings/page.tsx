import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import SettingsPageContent from "@/components/settings/SettingsPageContent";

export default function SettingsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen p-6">
        <SettingsPageContent />
      </main>

      <Footer />
    </>
  );
}