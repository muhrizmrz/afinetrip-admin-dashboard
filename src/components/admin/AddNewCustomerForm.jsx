import Breadcrumbs from "../utility/Breadcrumbs";
import Button from "../utility/Button";

export default function AddNewCustomerForm() {
  return (
    <div>
      <Breadcrumbs />
      <h1 className="text-xl font-semibold text-[#15144E] mb-4">
        Add New Customer
      </h1>
      <div className="bg-white p-6 rounded mb-6">
        <form>
          <h1 className="text-xl font-semibold text-[#15144E] mb-4">
            Company Basic Information
          </h1>
          <div className="flex gap-4 mb-4">
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]">First Name *</label>

              <input
                type="text"
                placeholder="Enter Name"
                className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]">Last Name</label>
              <input
                type="text"
                placeholder="Enter Detail"
                className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
              />
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]">Email *</label>

              <input
                type="text"
                placeholder="Enter Name"
                className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]">Mobile</label>
              <input
                type="text"
                placeholder="Enter Detail"
                className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
              />
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]">Password *</label>

              <input
                type="text"
                placeholder="Enter Name"
                className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]">Confirm Password *</label>
              <input
                type="text"
                placeholder="Enter Detail"
                className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
              />
            </div>
          </div>
        </form>
      </div>
      <div className="bg-white p-6 rounded">
        <form>
          <h1 className="text-xl font-semibold text-[#15144E] mb-4">
            Contact Information
          </h1>
          <div className="flex gap-4 mb-4">
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]">Address</label>

              <input
                type="text"
                placeholder="Enter Name"
                className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]">City</label>
              <input
                type="text"
                placeholder="Enter Detail"
                className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
              />
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]">State</label>

              <input
                type="text"
                placeholder="Enter Name"
                className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]">Country</label>
              <input
                type="text"
                placeholder="Enter Detail"
                className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
              />
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]">Pincode</label>

              <input
                type="text"
                placeholder="Enter Name"
                className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]">Remark</label>
              <input
                type="text"
                placeholder="Enter Detail"
                className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
              />
            </div>
          </div>
          <div class="flex gap-2">
            <Button
              type="submit"
              variant="primary"
            >
              Register
            </Button>
            <Button
              type="submit"
              variant="secondary"
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
