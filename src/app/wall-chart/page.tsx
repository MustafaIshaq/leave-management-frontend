import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import WallChart from "@/components/wallchart/WallChart";

export default function WallChartPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen p-6">
        <h1 className="mb-4 text-2xl font-bold">Wall Chart</h1>

        <WallChart />
      </main>

      <Footer />
    </>
  );
}