import { useState } from "react";
import Breadcrumbs from "../utility/Breadcrumbs";
import ImageUpload from "../utility/ImageUpload";
import Button from "../utility/Button";

export default function AddBlogForm() {
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
              <label className="mb-2 text-[#15144e]">Title</label>

              <input
                type="text"
                placeholder="Enter Title"
                className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]"> Slug</label>
              <input
                type="text"
                placeholder="Enter Slug"
                className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
              />
            </div>
          </div>
          <div className="w-full flex flex-col mb-4">
            <label className="mb-2 text-[#15144e]">Description</label>
            <textarea className="rounded border border-[#d0d0d0] resize-none h-[231px] py-1 px-2 w-full outline-none" />
          </div>
          <ImageUpload
            fileName={fileName}
            title="Image"
            onChange={handleFileChange}
          />
          <div className="flex gap-4 mb-4">
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]">Category </label>
              <select className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none h-full">
                <option value="Select category">Select Category</option>
              </select>
            </div>
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]">Status</label>
              <select className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none h-full">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="w-full flex flex-col mb-4">
            <label className="mb-2 text-[#15144e]">Meta Title</label>

            <input
              type="text"
              placeholder="Category Meta Title"
              className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
            />
          </div>

          <div className="w-full flex flex-col mb-4">
            <label className="mb-2 text-[#15144e]">Meta Description</label>
            <textarea className="rounded border border-[#d0d0d0] resize-none h-[144px] py-1 px-2 w-full outline-none" />
          </div>
          <div className="w-full flex flex-col mb-4">
            <label className="mb-2 text-[#15144e]">Updated By</label>

            <input
              type="text"
              className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
            />
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
            <Button
              type="submit"
              variant="primary"
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
