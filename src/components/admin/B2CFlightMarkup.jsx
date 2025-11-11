import Breadcrumbs from "../utility/Breadcrumbs";
import Button from "../utility/Button";

export default function B2CFlightMarkup() {
  return (
    <div>
      <Breadcrumbs />
      <h1 className="text-xl font-semibold text-[#15144E] mb-4">
        Add B2C Flight Markup
      </h1>
      <div className="bg-white p-6 rounded">
        <form>
          <div className="flex flex-col w-full gap-4 mb-4">
            <div className="flex gap-4">
              <div className="w-full flex flex-col">
                <label className="mb-2 text-[#15144e]">
                  Domestic/International
                </label>
                <select className="rounded border outline-none cursor-pointer border-[#d0d0d0] py-1 px-2 w-full h-full">
                  <option value="Domestic">Domestic</option>
                  <option value="International">International</option>
                </select>
              </div>
              <div className="w-full flex flex-col">
                <label className="mb-2 text-[#15144e]">Amount</label>
                <select className="rounded border outline-none cursor-pointer border-[#d0d0d0] py-1 px-2 w-full h-full ">
                  <option value="Fixed">Fixed</option>
                  <option value="Variable">Variable</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-full flex flex-col">
                <label className="mb-2 text-[#15144e]">Amount</label>
                <input
                  type="text"
                  placeholder="Enter Amount"
                  className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
                />
              </div>
              <div className="w-full flex flex-col">
                <label className="mb-2 text-[#15144e]">Amount</label>
                <select className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none h-full">
                  <option value="All">All</option>
                  <option value="Variable">Variable</option>
                </select>
              </div>
            </div>
          </div>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}
