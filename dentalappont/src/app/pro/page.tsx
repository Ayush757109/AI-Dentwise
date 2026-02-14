import Navbar from "@/components/Navbar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ProClient from "./ProClient";

export default async function ProPage() {
  const user = await currentUser();

  if (!user) redirect("/");

  return (
    <>
      <Navbar />
      <ProClient />
    </>
  );
}
