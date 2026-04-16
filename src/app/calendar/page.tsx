import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import CalendarPageContent from "@/components/calendar/CalendarPageContent";

export default function CalendarPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen p-6">
        <CalendarPageContent />
      </main>

      <Footer />
    </>
  );
}