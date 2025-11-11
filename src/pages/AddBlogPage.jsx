import AddBlogForm from "../components/admin/AddBlogForm";
import AdminLayout from "../components/admin/AdminLayout/AdminLayout";

export default function AddBlogFormPage() {
  return (
    <div>
      <AdminLayout children={<AddBlogForm />} />
    </div>
  );
}
