import Breadcrumbs from "../utility/Breadcrumbs";
import { FaClockRotateLeft } from "react-icons/fa6";
import { BsGlobe2 } from "react-icons/bs";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import ImageUpload from "../utility/ImageUpload";
import Button from "../utility/Button";

export default function SystemSettings() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [language, setLanguage] = useState("");
  const [logoFileName, setLogoFileName] = useState("");
  const [faviconFileName, setFaviconFileName] = useState("");

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") setLogoFileName(file.name);
    else {
      setLogoFileName("Only PNG files are allowed.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      image.onload = () => {
        const { width, height } = image;
        if (width > 400 || height > 65) {
          setLogoFileName(
            `Image dimensions must be at most 400x65 pixels. Got: ${width}x${height}`
          );
        } else {
          setLogoFileName(file.name);
        }
      };
      image.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };
  const handleFaviconChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") setFaviconFileName(file.name);
    else {
      setFaviconFileName("Only PNG files are allowed.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      image.onload = () => {
        const { width, height } = image;
        if (width > 32 || height > 32) {
          setFaviconFileName(
            `Image dimensions must be at most 32x32 pixels. Got: ${width}x${height}`
          );
        } else {
          setFaviconFileName(file.name);
        }
      };
      image.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const userLanguage = navigator.language;
    setLanguage(userLanguage);
  }, []);
  return (
    <div>
      <Breadcrumbs />
      <h1 className="text-xl font-semibold text-[#15144E] mb-4">
        Address List
      </h1>
      <div className="bg-white p-6 rounded mb-6">
        <div className="flex justify-between mb-4 gap-2">
          <h1 className="text-xl font-semibold text-[#15144E] ">Contact</h1>
          <div className="flex gap-2">
            <div className="flex gap-2 items-center">
              <FaClockRotateLeft />
              <span>{formattedDate}</span>
            </div>
            <div className="flex gap-2 items-center">
              <BsGlobe2 />
              <span>{language}</span>
            </div>
            <div className="flex items-center bg-gray-300 hover:bg-gray-400 cursor-pointer rounded p-1">
              <button>
                <AiFillEdit />
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-6">
          <div className="flex gap-2 ">
            <div className="mt-1 text-[#15144E]">
              <FaLocationDot />
            </div>
            <div className="flex flex-col gap-1 text-gray-500">
              <span>Europe Afine Trip, Zurawia 43/10,</span>
              <div className="flex gap-1">
                <span className="text-[#15144E]">City : </span>
                <span>Warszawa</span>
              </div>
              <div className="flex gap-1">
                <span className="text-[#15144E]">State : </span>
                <span> Mazowieckie</span>
              </div>
              <div className="flex gap-1">
                <span className="text-[#15144E]">Country : </span>
                <span> Poland</span>
              </div>
              <div className="flex gap-1">
                <span className="text-[#15144E]">Pincode : </span>
                <span> 00-680</span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-2 ">
              <div className="mt-1 text-[#15144E]">
                <FaPhoneAlt />
              </div>
              <div className="flex flex-col gap-1 text-gray-500">
                <div className="flex gap-1 ">
                  <span className="">Europe : </span>
                  <span>+48 532 872 000</span>
                </div>
                <div className="flex gap-1">
                  <span className="">India : </span>
                  <span> +91 7661-871111</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 ">
            <div className="mt-1 text-[#15144E]">
              <FaEnvelope />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-1 text-gray-500 flex-col">
                <span className="">contact@afinetrip.com</span>
                <span>Info@afinetrip.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-8">
        <div className="w-full">
          <h1 className="text-xl font-semibold text-[#15144E] mb-4">Logo</h1>
          <div className="bg-white p-6 rounded mb-6 ">
            <div className="mb-4">
              <div className="text-gray-500 text-sm mb-4"> Current Logo</div>
              <img src="./public/images/logo.svg" alt="logo" />
            </div>
            <ImageUpload
              fileName={logoFileName}
              title="Change Favicon"
              onChange={handleLogoChange}
              titleClassName="text-sm"
            />
            <div className="flex text-xs">
              <FaCircleInfo className="text-[#15144E]" />
              <span className="ml-1">
                Please select .png file and size should be 400*65 px.
              </span>
            </div>
            <div className="flex justify-end">
              <Button variant="primary">
                Update
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h1 className="text-xl font-semibold text-[#15144E] mb-4">Favicon</h1>
          <div className="bg-white p-6 rounded mb-6">
            <div className="mb-4">
              <div className="text-gray-500 text-sm mb-4"> Current Favicon</div>
              <img src="./public/images/logo.svg" alt="favicon" />
            </div>

            <ImageUpload
              fileName={faviconFileName}
              title="Change Favicon"
              onChange={handleFaviconChange}
              titleClassName="text-sm"
            />

            <div className="flex text-xs">
              <FaCircleInfo className="text-[#15144E]" />
              <span className="ml-1">
                Please select .png file and size should be 32*32 px.
              </span>
            </div>
            <div className="flex justify-end">
              <Button variant="primary">
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-xl font-semibold text-[#15144E] mb-4">
        Update Details
      </h1>
      <div className="bg-white p-6 rounded">
        <form>
          <div className="flex gap-4 mb-4">
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]">Company Name</label>

              <input
                type="text"
                placeholder="Enter Name"
                className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]">GSTIN</label>
              <input
                type="text"
                placeholder="Enter GSTIN"
                className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
              />
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]">Pancard</label>

              <input
                type="text"
                placeholder="Enter Pancard No"
                className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="mb-2 text-[#15144e]">Copyright</label>
              <input
                type="text"
                className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
            >
              Change
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
