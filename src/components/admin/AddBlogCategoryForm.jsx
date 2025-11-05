import { useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import ImageUpload from "../utility/ImageUpload";

export default function AddBlogCategoryForm() {
  const [fileName, setFileName] = useState("");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
    else setFileName("");
  };
  return (
    <div>
      <Breadcrumbs />
      <h1 className="text-xl font-semibold text-[#15144E] mb-4">
        Add Blog Category
      </h1>
      <div className="bg-white p-6 rounded">
        <form>
          <div className="flex gap-4 mb-4">
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]">Category Name</label>

              <input
                type="text"
                placeholder="Enter Name"
                className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]">Category Slug</label>
              <input
                type="text"
                placeholder="Enter Slug"
                className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
              />
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]">Category Tags</label>

              <input
                type="text"
                placeholder="Enter Tag"
                className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]">Category Status</label>
              <select className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none h-full">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <ImageUpload
            fileName={fileName}
            title="Category Image"
            onChange={handleFileChange}
          />
          <div className="w-full flex flex-col mb-4">
            <label className="mb-2 text-[#15144e]">Meta Title</label>

            <input
              type="text"
              placeholder="Category Meta Title"
              className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
            />
          </div>
          <div className="w-full flex flex-col mb-4">
            <label className="mb-2 text-[#15144e]">Meta Keyword</label>

            <textarea className="rounded border border-[#d0d0d0] resize-none h-[231px] py-1 px-2 w-full outline-none" />
          </div>
          <div className="w-full flex flex-col mb-4">
            <label className="mb-2 text-[#15144e]">Meta Description</label>
            <textarea className="rounded border border-[#d0d0d0] resize-none h-[144px] py-1 px-2 w-full outline-none" />
          </div>
          <div className="w-full flex flex-col mb-4">
            <label className="mb-2 text-[#15144e]">Language</label>

            <input
              type="text"
              placeholder="En"
              className="rounded border border-[#d0d0d0] py-1 px-2 w-1/2 outline-none"
            />
          </div>
          <div className="flex w-full justify-end">
            <button
              type="submit"
              className="bg-[#15144e] text-white rounded px-4 py-2 "
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
