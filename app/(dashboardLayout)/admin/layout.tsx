import DashboardLayout from "@/components/shared/layout/DashboardLayout";

export default function Layout({ children }: {
    children: React.ReactNode
}) {
  return (
    <DashboardLayout>
       {children}
    </DashboardLayout>
  );
}