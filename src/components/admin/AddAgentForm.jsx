import Breadcrumbs from "../utility/Breadcrumbs";
import { Link } from "react-router-dom";
import { PiBuildingsFill } from "react-icons/pi";
import {
  FaArrowRight,
  FaCalculator,
  FaFileUpload,
  FaEnvelope,
} from "react-icons/fa";
import { useState, useRef } from "react";
import Button from "../utility/Button";
import Input from "../utility/Input";
import LocationSelector from "../utility/Address"


export default function AddAgentForm() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { icon: <PiBuildingsFill />, label: "Company Information" },
    // { icon: <FaCalculator />, label: "Tax Information" },
    // { icon: <FaFileUpload />, label: "Upload Document" },
    { icon: <FaEnvelope />, label: "Other Details" },
  ];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div>
            <h4 className="font-semibold mb-4 text-[#15144e]">
              Company Basic Information
            </h4>
            <form className="text-sm">
              <div>
                <div className="flex mb-6 gap-4">
                  <Input
                    label="Company Name *"
                    placeholder="Enter Company Name"
                  />
                  <div className="w-full flex flex-col">
                    <label className="mb-2 text-[#15144e]">Mobile *</label>

                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength="13"
                      placeholder="Enter Mobile"
                      pattern="^(?:\+91|91|0)?[789]\d{9}$"
                      className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
                    />
                  </div>
                </div>
                <div className="flex mb-6 gap-4">
                  <div className="w-full flex flex-col">
                    <label className="mb-2 text-[#15144e]">
                      Office Phone Number
                    </label>

                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength="13"
                      placeholder="Enter Office Phone Number"
                      pattern="^(?:\+91|91|0)?[789]\d{9}$"
                      className="rounded border border-[#d0d0d0] py-1 pl-2 w-full outline-none"
                    />
                  </div>
                  <Input
                    label="Email ID *"
                    placeholder="Enter Email Id"
                    type="email"
                  />
                </div>
                <div className="flex mb-6    gap-4">
                  <Input label="Login ID *" placeholder="Enter Login ID" />
                  <Input
                    label="Login PIN *"
                    placeholder="Enter Login PIN"
                    type="password"
                  />
                </div>
                <div className="flex mb-6 gap-4">
                  <Input
                    label="Password *"
                    placeholder="Enter Password"
                    type="password"
                  />
                  <Input
                    label="Confirm Password *"
                    placeholder="Re-enter Password"
                    type="password"
                  />
                  <div className="w-full flex flex-col">
                    <label className="mb-2 text-[#15144e]">Class</label>

                    <select className="rounded border outline-none cursor-pointer border-[#d0d0d0] py-1 px-2 w-full h-full">
                      <option value="silver">Silver</option>
                      <option value="gold">Gold</option>
                      <option value="diamond">Diamond</option>
                      <option value="platinum">Platinum</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        );
      case 1:
        return (
          <div>
            <div>
              <h4 className="font-semibold mb-4">Tax Information</h4>
              <form className="text-sm">
                <div className="flex mb-6 gap-4">
                  <Input label="Tax No *" placeholder="Enter Tax No" />
                </div>
              </form>
            </div>
            <div>
              <h4 className="font-semibold pb-2">Upload Document</h4>
              <div className="bg-gray-100 min-h-[300px] w-3/4 mx-auto rounded-xl m-4 flex justify-center items-center shadow-md">
                <div className="flex flex-col items-center">
                  {!selectedFile ? (
                    <span className=" text-center mb-4">
                      Please select a file to upload
                    </span>
                  ) : (
                    <span className="text-white text-center mb-4">
                      {selectedFile.name}
                    </span>
                  )}
                  <Button
                    onClick={() => {
                      fileInputRef.current.click();
                    }}
                    variant="primary"
                  >
                    Select File
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Information</h4>
              <form className="text-sm">
                <div className="flex mb-6 gap-4">
                  <div className="w-full flex flex-col">
                    <label className="mb-2 text-[#15144e]">Class</label>
                    <select className="rounded border outline-none cursor-pointer border-[#d0d0d0] py-1 px-2 w-full h-full">
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms.">Ms.</option>
                    </select>
                  </div>
                  <Input label="Name *" placeholder="Enter Name" />
                </div>
                <div className=" mb-2">
                  <Input label="Address *" placeholder="Address Line 1" />
                  <Input placeholder="Address Line 2" />
                </div>
                  <LocationSelector/>
              </form>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      <Breadcrumbs />
      <div className="flex justify-between items-center w-full  mb-6">
        <h1 className="text-xl font-semibold text-[#15144E]">Add Agent</h1>
        <Link to="/agentlist" className="flex gap-2">
          <span className="text-[#15144E] text-m">Agent List</span>
          <div className="flex items-center justify-center rounded-full bg-[#15144E] hover:bg-[#2a2965]  w-6 h-6">
            <FaArrowRight className="text-white text-xs " />
          </div>
        </Link>
      </div>
      <div className="px-6">
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;
            return (
              <div key={index} className="flex-1 flex items-center relative">
                <div
                  className={`z-10 w-9 h-9 flex items-center justify-center rounded-full border-2 mx-auto transition-all duration-300 ${
                    isCompleted
                      ? "bg-[#15144E] border-[#15144E] text-white"
                      : isActive
                      ? "bg-white border-[#15144E] text-[#15144E]"
                      : "bg-white border-[#d0d0d0] text-[#d0d0d0]"
                  }`}
                >
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute left-1/2 right-[-50%] top-1/2 h-[2px] ${
                      isCompleted ? "bg-[#15144E]" : "bg-[#d0d0d0]"
                    } transition-all duration-500`}
                  ></div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-between mt-2 text-xs text-center">
          {steps.map((step, index) => (
            <p key={index} className="flex-1 text-[#15144E]">
              {step.label}
            </p>
          ))}
        </div>
      </div>
      <div className="rounded bg-white p-4 mt-6">
        {renderStepContent()}
        <div className="flex justify-end">
          <div className="flex gap-2">
            <Button
              onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
              disabled={activeStep === 0}
              className={`p-2-rounded ${activeStep === 0 ? "hidden" : ""}`}
              variant="secondary"
            >
              Previous
            </Button>
            {activeStep < steps.length - 1 ? (
              <Button onClick={() => setActiveStep((prev) => prev + 1)}>
                Next
              </Button>
            ) : (
              <Button
                onClick={() => alert("Form submitted!")}
                className="bg-green-500 hover:bg-green-600"
                variant="primary"
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
