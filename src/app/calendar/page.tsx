import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function CalendarPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen p-6">
        {/* Page title */}
        <h1 className="mb-4 text-2xl font-bold">Calendar</h1>

        {/* Simple content box */}
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-600">
            This is the calendar page. Later, the leave calendar will be shown
            here.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}