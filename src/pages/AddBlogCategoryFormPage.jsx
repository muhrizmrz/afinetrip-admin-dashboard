
import AddBlogCategoryForm from "../components/admin/AddBlogCategoryForm";
import AdminLayout from "../components/admin/AdminLayout/AdminLayout";

export default function AddBlogCategoryFormPage() {
  return (
    <div>
      <AdminLayout children={<AddBlogCategoryForm/>}/>
    </div>
  );
}