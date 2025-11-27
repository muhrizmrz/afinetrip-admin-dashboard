import Breadcrumbs from "../utility/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import { PiBuildingsFill } from "react-icons/pi";
import { FaArrowRight, FaEnvelope } from "react-icons/fa";
import { useState, useRef } from "react";
import Button from "../utility/Button";
import Input from "../utility/Input";
import LocationSelector from "../utility/Address";
import toast from "react-hot-toast";
import { createAgent } from "../../services/agentService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddAgentForm() {
  const fileInputRef = useRef(null);

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState({}); // errors from backend

  // form state
  const [form, setForm] = useState({
    // user / credentials
    name: "",
    email: "",

    // company basic
    company_name: "",
    mobile: "",
    office_phone: "",
    login_id: "",

    // tax & contact
    tax_no: "",
    salutation: "Mr.",
    contact_name: "",

    // address
    address_line1: "",
    address_line2: "",
    country_id: null,
    state_id: null,
    city_id: null,
    postal_code: "",

    // gst
    // gst_number: "",
    // gst_company_name: "",
    // gst_company_email: "",
    // gst_company_contact_number: "",
    // gst_company_address: "",
  });

  const [errors, setErrors] = useState({});

  // const steps = [
  //   { icon: <PiBuildingsFill />, label: "Company Information" },
  //   { icon: <FaEnvelope />, label: "Other Details" },
  // ];

  const setField = (field, value) => {
    setForm((s) => ({ ...s, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
    setServerErrors({});
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^(?:\+91|91|0)?[6789]\d{9}$/;

  const validateStep0 = () => {
    console.log(form);
    const newErrors = {};
    if (!form.company_name?.trim()) newErrors.company_name = "Company name is required";
    if (!form.mobile?.trim()) newErrors.mobile = "Mobile is required";
    else if (!mobileRegex.test(form.mobile.trim())) newErrors.mobile = "Invalid mobile number";
    if (!form.email?.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(form.email.trim())) newErrors.email = "Invalid email";
    if (!form.login_id?.trim()) newErrors.login_id = "Login ID is required";
    // if (!form.login_pin?.trim()) newErrors.login_pin = "Login PIN is required";
    // if (!form.password) newErrors.password = "Password is required";
    // if (!form.password_confirmation) newErrors.password_confirmation = "Confirm the password";
    // if (form.password && form.password_confirmation && form.password !== form.password_confirmation) {
    //   newErrors.password_confirmation = "Passwords do not match";
    // }
    if (!form.contact_name?.trim()) newErrors.contact_name = "Contact name is required";
    if (!form.address_line1?.trim()) newErrors.address_line1 = "Address line 1 is required";
    if (!form.country_id) newErrors.country_id = "Country is required";
    if (!form.state_id) newErrors.state_id = "State is required";
    if (!form.city_id) newErrors.city_id = "City is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  const handleLocationChange = (location) => {
    setForm((s) => ({
      ...s,
      country_id: location.country ?? s.country_id,
      state_id: location.state ?? s.state_id,
      city_id: location.city ?? s.city_id,
      // postal_code: location.postal_code ?? s.postal_code,
    }));
    setErrors((e) => ({ ...e, country_id: undefined, state_id: undefined, city_id: undefined }));
  };

  const queryClient = useQueryClient();

  const createAgentMutation = useMutation({
    mutationFn: async (payload) => {
      return await createAgent(payload);
    },

    onSuccess: (data) => {
      toast.success("Agent created successfully");

      // optional → instantly update agent list cache so newly added agent appears without refresh
      queryClient.invalidateQueries(["agents"]);

      // Reset your form
      // (same as your commented code)
      // setForm({
      //   name: "",
      //   email: "",
      //   company_name: "",
      //   mobile: "",
      //   office_phone: "",
      //   login_id: "",
      //   tax_no: "",
      //   salutation: "Mr.",
      //   contact_name: "",
      //   address_line1: "",
      //   address_line2: "",
      //   country_id: null,
      //   state_id: null,
      //   city_id: null,
      //   postal_code: "",
      // });

      // Navigate to agent list or another page if needed
      // navigate("/agentlist");
    },

    onError: (error) => {
      const server = error?.response?.data?.errors;

      if (server) setServerErrors(server);

      toast.error("Failed to create agent");
    },
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep0()) return;

    setLoading(true);
    setServerErrors({});

    const payload = {
      name: form.name || form.contact_name || form.company_name,
      email: form.email,
      company_name: form.company_name,
      mobile: form.mobile,
      office_phone: form.office_phone,
      login_id: form.login_id,
      tax_no: form.tax_no,
      salutation: form.salutation,
      contact_name: form.contact_name,
      address_line1: form.address_line1,
      address_line2: form.address_line2,
      country: form.country_id,
      state: form.state_id,
      city: form.city_id,
      postal_code: form.postal_code,
    };

    createAgentMutation.mutate(payload, {
      onSettled: () => setLoading(false),
    });
  };


  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    // you can store and later upload the file in a multipart request
    // setSelectedFile(file);
    fileInputRef.current.value = null;
  };

  // const renderStepContent = () => {
  //   switch (activeStep) {
  //     case 1:
  //       return (
  //         <div>
  //           <div>
  //             <h4 className="font-semibold mb-4">Tax Information</h4>
  //             <form className="text-sm" onSubmit={(e) => e.preventDefault()}>
  //               <div className="flex mb-6 gap-4">
  //                 <Input
  //                   label="Tax No"
  //                   placeholder="Enter Tax No"
  //                   value={form.tax_no}
  //                   onChange={(e) => setField("tax_no", e.target.value)}
  //                 />
  //               </div>
  //             </form>
  //           </div>

  //           <div>
  //             <h4 className="font-semibold mb-4">Contact Information</h4>
  //             <form className="text-sm" onSubmit={(e) => e.preventDefault()}>
  //               <div className="flex mb-6 gap-4">
  //                 <div className="w-full flex flex-col">
  //                   <label className="mb-2 text-[#15144e]">Salutation</label>
  //                   <select
  //                     value={form.salutation}
  //                     onChange={(e) => setField("salutation", e.target.value)}
  //                     className="rounded border outline-none cursor-pointer border-[#d0d0d0] py-1 px-2 w-full h-full"
  //                   >
  //                     <option value="Mr.">Mr.</option>
  //                     <option value="Mrs">Mrs</option>
  //                     <option value="Ms.">Ms.</option>
  //                   </select>
  //                 </div>
  //                 <div className="w-full">
  //                   <Input
  //                     label="Name *"
  //                     placeholder="Enter Name"
  //                     value={form.contact_name}
  //                     onChange={(e) => setField("contact_name", e.target.value)}
  //                   />
  //                   {errors.contact_name && (
  //                     <p className="text-xs text-red-500 mt-1">{errors.contact_name}</p>
  //                   )}
  //                 </div>
  //               </div>

  //               <div className="mb-2">
  //                 <Input
  //                   label="Address *"
  //                   placeholder="Address Line 1"
  //                   value={form.address_line1}
  //                   onChange={(e) => setField("address_line1", e.target.value)}
  //                 />
  //                 {errors.address_line1 && (
  //                   <p className="text-xs text-red-500 mt-1">{errors.address_line1}</p>
  //                 )}

  //                 <Input
  //                   placeholder="Address Line 2"
  //                   value={form.address_line2}
  //                   onChange={(e) => setField("address_line2", e.target.value)}
  //                 />
  //               </div>

  //               <div className="mb-4">
  //                 {/* LocationSelector should call handleLocationChange with
  //                     { country_id, state_id, city_id, postal_code } or similar.
  //                     Adjust if your Address component uses different prop names. */}
  //                 <LocationSelector onChange={handleLocationChange} value={{
  //                   country_id: form.country_id,
  //                   state_id: form.state_id,
  //                   city_id: form.city_id,
  //                   postal_code: form.postal_code
  //                 }} />
  //                 {errors.country_id && <p className="text-xs text-red-500 mt-1">{errors.country_id}</p>}
  //                 {errors.state_id && <p className="text-xs text-red-500 mt-1">{errors.state_id}</p>}
  //                 {errors.city_id && <p className="text-xs text-red-500 mt-1">{errors.city_id}</p>}
  //               </div>

  //               {/* <div className="mb-6">
  //                 <Input
  //                   label="GST Company Name"
  //                   placeholder="GST Company Name"
  //                   value={form.gst_company_name}
  //                   onChange={(e) => setField("gst_company_name", e.target.value)}
  //                 />
  //                 <Input
  //                   label="GST Number"
  //                   placeholder="GST Number"
  //                   value={form.gst_number}
  //                   onChange={(e) => setField("gst_number", e.target.value)}
  //                 />
  //               </div> */}
  //             </form>
  //           </div>
  //         </div>
  //       );
  //     default:
  //       return null;
  //   }
  // };

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

      {/* <div className="px-6">
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
      </div> */}

      <div className="rounded bg-white p-4 mt-6">
        {/* {renderStepContent()} */}

        <div>
          <h4 className="font-semibold mb-4 text-[#15144e]">Company Basic Information</h4>
          <form className="text-sm" onSubmit={(e) => e.preventDefault()}>
            <div>
              <div className="flex mb-6 gap-4">
                <div className="w-full">
                  <Input
                    label="Company Name *"
                    placeholder="Enter Company Name"
                    value={form.company_name}
                    onChange={(e) => setField("company_name", e.target.value)}
                  />
                  {errors.company_name && (
                    <p className="text-xs text-red-500 mt-1">{errors.company_name}</p>
                  )}
                </div>

                <div className="w-full flex flex-col">
                  <label className="mb-2 text-[#15144e]">Mobile *</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength="13"
                    placeholder="Enter Mobile"
                    value={form.mobile}
                    onChange={(e) => setField("mobile", e.target.value)}
                    className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
                  />
                  {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
                </div>
              </div>

              <div className="flex mb-6 gap-4">
                <div className="w-full flex flex-col">
                  <label className="mb-2 text-[#15144e]">Office Phone Number</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength="13"
                    placeholder="Enter Office Phone Number"
                    value={form.office_phone}
                    onChange={(e) => setField("office_phone", e.target.value)}
                    className="rounded border border-[#d0d0d0] py-1 pl-2 w-full outline-none"
                  />
                </div>
                <div className="w-full">
                  <Input
                    label="Email ID *"
                    placeholder="Enter Email Id"
                    type="email"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  {serverErrors.email && (
                    <p className="text-xs text-red-500 mt-1">{serverErrors.email.join(", ")}</p>
                  )}
                </div>
              </div>

              <div className="flex mb-6 gap-4">
                <div className="w-full">
                  <Input
                    label="Login ID *"
                    name="login_id"
                    placeholder="Enter Login ID"
                    value={form.login_id}
                    onChange={(e) => setField("login_id", e.target.value)}
                  />
                  {errors.login_id && (
                    <p className="text-xs text-red-500 mt-1">{errors.login_id}</p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>

        <div>
          <div>
            <h4 className="font-semibold mb-4">Tax Information</h4>
            <form className="text-sm" onSubmit={(e) => e.preventDefault()}>
              <div className="flex mb-6 gap-4">
                <Input
                  label="Tax No"
                  placeholder="Enter Tax No"
                  value={form.tax_no}
                  onChange={(e) => setField("tax_no", e.target.value)}
                />
              </div>
            </form>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Information</h4>
            <form className="text-sm" onSubmit={(e) => e.preventDefault()}>
              <div className="flex mb-6 gap-4">
                <div className="w-full flex flex-col">
                  <label className="mb-2 text-[#15144e]">Salutation</label>
                  <select
                    value={form.salutation}
                    onChange={(e) => setField("salutation", e.target.value)}
                    className="rounded border outline-none cursor-pointer border-[#d0d0d0] py-1 px-2 w-full h-full"
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms.">Ms.</option>
                  </select>
                </div>
                <div className="w-full">
                  <Input
                    label="Name *"
                    placeholder="Enter Name"
                    value={form.contact_name}
                    onChange={(e) => setField("contact_name", e.target.value)}
                  />
                  {errors.contact_name && (
                    <p className="text-xs text-red-500 mt-1">{errors.contact_name}</p>
                  )}
                </div>
              </div>

              <div className="mb-2">
                <Input
                  label="Address *"
                  placeholder="Address Line 1"
                  value={form.address_line1}
                  onChange={(e) => setField("address_line1", e.target.value)}
                />
                {errors.address_line1 && (
                  <p className="text-xs text-red-500 mt-1">{errors.address_line1}</p>
                )}

                <Input
                  placeholder="Address Line 2"
                  value={form.address_line2}
                  onChange={(e) => setField("address_line2", e.target.value)}
                />
              </div>

              <div className="mb-4">
                <LocationSelector onChange={handleLocationChange} value={{
                  country_id: form.country_id,
                  state_id: form.state_id,
                  city_id: form.city_id,
                  postal_code: form.postal_code
                }} />
                {errors.country_id && <p className="text-xs text-red-500 mt-1">{errors.country_id}</p>}
                {errors.state_id && <p className="text-xs text-red-500 mt-1">{errors.state_id}</p>}
                {errors.city_id && <p className="text-xs text-red-500 mt-1">{errors.city_id}</p>}
              </div>
            </form>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="flex gap-2">
            <Button
              onClick={handleSubmit}
              disabled={loading || createAgentMutation.isPending}
              className="bg-green-500 hover:bg-green-600"
              variant="primary"
            >
              {createAgentMutation.isPending ? "Submitting..." : "Submit"}
            </Button>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
}