import Breadcrumbs from "../utility/Breadcrumbs";
import Button from "../utility/Button";

export default function AddClassForm() {
  return (
    <div>
      <Breadcrumbs />
      <h1 className="text-xl font-semibold text-[#15144E] mb-4">
        Add Agent Class
      </h1>
      <div className="bg-white p-6 rounded">
        <form>
          <div className="flex gap-4 mb-4">
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]">Class Name *</label>

              <input
                type="text"
                placeholder="Enter Name"
                className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]">Class Detail</label>
              <input
                type="text"
                placeholder="Enter Detail"
                className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
              />
            </div>
          </div>
          <Button
            type="submit"
            variant="primary"
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}
