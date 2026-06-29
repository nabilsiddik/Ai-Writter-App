export const dynamic = "force-dynamic";
import "../globals.css";
import Header from "@/components/shared/layout/Header";
import { Footer } from "@/components/shared/layout/Footer";
import getLogedInUser from "@/services/user/userManagement";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getLogedInUser();

  return (
    <>
      <Header user={user} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
