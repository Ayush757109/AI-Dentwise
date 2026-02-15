import WelcomeSection from "./WelcomeSection";
import ActivityOverview from "./ActivityOverview";
import MainActions from "./MainActions";
import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-8 pt-24 space-y-12">
      <WelcomeSection />
      <ActivityOverview />
      <MainActions />
      <Navbar/>
    </main>
  );
}
