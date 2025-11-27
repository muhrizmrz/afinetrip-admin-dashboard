// src/components/agent/AgentForm.jsx
import Breadcrumbs from "../utility/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import { PiBuildingsFill } from "react-icons/pi";
import { FaArrowRight, FaEnvelope } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Button from "../utility/Button";
import Input from "../utility/Input";
import LocationSelector from "../utility/Address";
import toast from "react-hot-toast";
import { createAgent, updateAgent } from "../../services/agentService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AgentForm({ agent = null, onSuccess }) {
  const isEdit = !!agent;
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    company_name: "",
    mobile: "",
    office_phone: "",
    login_id: "",
    tax_no: "",
    salutation: "Mr.",
    contact_name: "",
    address_line1: "",
    address_line2: "",
    country_id: null,
    state_id: null,
    city_id: null,
    postal_code: "",
  });

  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (isEdit && agent) {
      setForm({
        name: agent.name || "",
        email: agent.email || "",
        company_name: agent.company_name || "",
        mobile: agent.mobile || "",
        office_phone: agent.office_phone || "",
        login_id: agent.login_id || "",
        tax_no: agent.tax_no || "",
        salutation: agent.salutation || "Mr.",
        contact_name: agent.contact_name || "",
        address_line1: agent.address_line1 || "",
        address_line2: agent.address_line2 || "",
        country_id: agent.country_id || agent.country?.id || null,
        state_id: agent.state_id || agent.state?.id || null,
        city_id: agent.city_id || agent.city?.id || null,
        postal_code: agent.postal_code || "",
      });
    }
  }, [agent, isEdit]);

  const setField = (field, value) => {
    setForm((s) => ({ ...s, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
    setServerErrors({});
  };


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^(?:\+91|91|0)?[6789]\d{9}$/;

  const validateForm = () => {
    const newErrors = {};
    if (!form.company_name?.trim()) newErrors.company_name = "Company name is required";
    if (!form.mobile?.trim()) newErrors.mobile = "Mobile is required";
    else if (!mobileRegex.test(form.mobile.trim())) newErrors.mobile = "Invalid mobile number";
    if (!form.email?.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(form.email.trim())) newErrors.email = "Invalid email";
    if (!form.login_id?.trim()) newErrors.login_id = "Login ID is required";
    if (!form.contact_name?.trim()) newErrors.contact_name = "Contact name is required";
    if (!form.address_line1?.trim()) newErrors.address_line1 = "Address line 1 is required";
    if (!form.country_id) newErrors.country_id = "Country is required";
    if (!form.state_id) newErrors.state_id = "State is required";
    if (!form.city_id) newErrors.city_id = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLocationChange = (location) => {
    setForm((s) => ({
      ...s,
      country_id: location.country ?? s.country_id,
      state_id: location.state ?? s.state_id,
      city_id: location.city ?? s.city_id,
      postal_code: location.postal_code ?? s.postal_code,
    }));
    setErrors((e) => ({ ...e, country_id: undefined, state_id: undefined, city_id: undefined }));
  };

  const mutation = useMutation({
    mutationFn: (payload) =>
      isEdit ? updateAgent(agent.id, payload) : createAgent(payload),
    onSuccess: () => {
      toast.success(isEdit ? "Agent updated successfully" : "Agent created successfully");
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      if (isEdit) {
        queryClient.invalidateQueries({ queryKey: ["agent", agent.id] });
      }
      onSuccess?.();
    },
    onError: (error) => {
      const errs = error?.response?.data?.errors;
      if (errs) setServerErrors(errs);
      toast.error(isEdit ? "Failed to update agent" : "Failed to create agent");
    },
    onSettled: () => setLoading(false),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form:", form);
    if (!validateForm()) return;

    setLoading(true);
    setServerErrors({});

    const payload = {
      name: form.name || form.contact_name || form.company_name,
      email: form.email,
      company_name: form.company_name,
      mobile: form.mobile,
      office_phone: form.office_phone || "",
      login_id: form.login_id,
      tax_no: form.tax_no || "",
      salutation: form.salutation,
      contact_name: form.contact_name,
      address_line1: form.address_line1,
      address_line2: form.address_line2 || "",
      country_id: form.country_id,
      state_id: form.state_id,
      city_id: form.city_id,
      postal_code: form.postal_code || "",
    };

    mutation.mutate(payload);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    fileInputRef.current.value = null;
  };

  return (
    <div>
      <Breadcrumbs />
      <div className="flex justify-between items-center w-full mb-6">
        <h1 className="text-xl font-semibold text-[#15144E]">
          {isEdit ? "Edit Agent" : "Add Agent"}
        </h1>
        <Link to="/agentlist" className="flex gap-2">
          <span className="text-[#15144E] text-m">Agent List</span>
          <div className="flex items-center justify-center rounded-full bg-[#15144E] hover:bg-[#2a2965] w-6 h-6">
            <FaArrowRight className="text-white text-xs" />
          </div>
        </Link>
      </div>

      <div className="rounded bg-white p-4 mt-6">
        {/* Company Basic Information */}
        <div>
          <h4 className="font-semibold mb-4 text-[#15144e]">Company Basic Information</h4>
          <form className="text-sm" onSubmit={(e) => e.preventDefault()}>
            <div className="flex mb-6 gap-4">
              <div className="w-full">
                <Input
                  label="Company Name *"
                  placeholder="Enter Company Name"
                  value={form.company_name}
                  onChange={(e) => setField("company_name", e.target.value)}
                />
                {errors.company_name && <p className="text-xs text-red-500 mt-1">{errors.company_name}</p>}
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
                  className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
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
                {serverErrors.email && <p className="text-xs text-red-500 mt-1">{serverErrors.email.join(", ")}</p>}
              </div>
            </div>

            <div className="flex mb-6 gap-4">
              <div className="w-full">
                <Input
                  label="Login ID *"
                  placeholder="Enter Login ID"
                  value={form.login_id}
                  onChange={(e) => setField("login_id", e.target.value)}
                  disabled={isEdit} // Optional: usually login_id cannot be changed
                />
                {errors.login_id && <p className="text-xs text-red-500 mt-1">{errors.login_id}</p>}
              </div>
            </div>
          </form>
        </div>

        {/* Tax Information */}
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

        {/* Contact Information */}
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
                {errors.contact_name && <p className="text-xs text-red-500 mt-1">{errors.contact_name}</p>}
              </div>
            </div>

            <div className="mb-2">
              <Input
                label="Address *"
                placeholder="Address Line 1"
                value={form.address_line1}
                onChange={(e) => setField("address_line1", e.target.value)}
              />
              {errors.address_line1 && <p className="text-xs text-red-500 mt-1">{errors.address_line1}</p>}

              <Input
                placeholder="Address Line 2"
                value={form.address_line2}
                onChange={(e) => setField("address_line2", e.target.value)}
              />
            </div>

            <div className="mb-4">
              <LocationSelector
                value={{
                  country_id: form.country_id,
                  state_id: form.state_id,
                  city_id: form.city_id,
                }}
                onChange={(location) => {
                  console.log("Location changed:", location);
                  setForm((prev) => ({
                    ...prev,
                    country_id: location.country_id,
                    state_id: location.state_id,
                    city_id: location.city_id,
                  }));
                  // Clear errors
                  setErrors((e) => ({ ...e, country_id: undefined, state_id: undefined, city_id: undefined }));
                }}
              />
              {errors.country_id && <p className="text-xs text-red-500 mt-1">{errors.country_id}</p>}
              {errors.state_id && <p className="text-xs text-red-500 mt-1">{errors.state_id}</p>}
              {errors.city_id && <p className="text-xs text-red-500 mt-1">{errors.city_id}</p>}
            </div>
          </form>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-8">
          <Button
            onClick={handleSubmit}
            disabled={loading || mutation.isPending}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            {mutation.isPending ? "Saving..." : isEdit ? "Update Agent" : "Create Agent"}
          </Button>
        </div>
      </div>
    </div>
  );
}