import AdminProfileInfoForm from "@/components/admin/AdminProfileInfoForm";
import ChangePasswordForm from "@/components/admin/ChangePasswordForm";

export default function AdminProfilePage() {
  return (
    // Break out of the dark admin shell's padding so the light page
    // background fills the full main area for this route only.
    <div className="-mx-5 sm:-mx-8 lg:-mx-10 -my-6 sm:-my-8 min-h-screen bg-brand-cream text-brand-ink px-5 sm:px-8 lg:px-10 py-6 sm:py-8 pl-14 lg:pl-10">
      <h1 className="font-heading font-800 text-brand-ink text-2xl sm:text-3xl tracking-tight uppercase mb-8">
        Admin Profile
      </h1>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <AdminProfileInfoForm />
        <ChangePasswordForm />
      </div>
    </div>
  );
}
