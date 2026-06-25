import { Inter } from "next/font/google";
import "../globals.css";
import { getUser } from "@/services/auth/getUser";
import Header from "@/components/shared/layout/Header";
import { Footer } from "@/components/shared/layout/Footer";
import getLogedInUser from "@/services/user/userManagement";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getLogedInUser();

  return (
    <html lang="bn">
      <body className={inter.className}>
        {/* <AuthProvider>
          <CartProvider>
            
          </CartProvider>
        </AuthProvider> */}
        {/* <NotificationSystem /> */}
        {/* <Navbar user = {user} cart = {cart}/> */}
        <Header user={user}/>
        <main className="py-20 bg-[#050505] ">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
