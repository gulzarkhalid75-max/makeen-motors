import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isUserAdmin, fetchAllVehiclesAdmin } from "@/lib/admin/server";
import AdminDashboard from "@/components/AdminDashboard";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?redirect=/admin");
  }

  if (!(await isUserAdmin(user.id))) {
    redirect("/?error=admin_access_denied");
  }

  const vehicles = await fetchAllVehiclesAdmin();

  return <AdminDashboard initialVehicles={vehicles} />;
}
