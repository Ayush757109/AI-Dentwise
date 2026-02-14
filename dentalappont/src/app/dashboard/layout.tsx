import { syncUser } from "@/lib/actions/users";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await syncUser(); // Runs on server safely

  return <>{children}</>;
}
