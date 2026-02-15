import DentalHealthOverview from "./DentalHealthOverview";
import NextAppointment from "./NextAppointment";

export default function ActivityOverview() {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2">
        <DentalHealthOverview />
      </div>

      <div>
        <NextAppointment />
      </div>
    </section>
  );
}
