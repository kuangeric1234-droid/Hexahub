"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitEnquiry, type EnquiryState } from "@/lib/actions/enquiry";
import { CheckCircle, AlertCircle, Send } from "lucide-react";

const initialState: EnquiryState = { success: false };

const INTEREST_OPTIONS = [
  { value: "", label: "Select an option…" },
  { value: "warehouse", label: "Warehouse Unit" },
  { value: "storage", label: "Storage Space" },
  { value: "showroom-warehouse", label: "Showroom + Warehouse" },
  { value: "office-warehouse", label: "Office + Warehouse" },
  { value: "office", label: "Office" },
  { value: "general", label: "General enquiry" },
  { value: "book-tour", label: "Book a site tour" },
];

interface Props {
  unitId?: string;
  unitTitle?: string;
  source?: string;
  showInterestField?: boolean;
}

export default function EnquiryForm({
  unitId,
  unitTitle,
  source = "website",
  showInterestField = false,
}: Props) {
  const [state, action, pending] = useActionState(submitEnquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <form ref={formRef} action={action} className="space-y-5" noValidate>
      <input type="hidden" name="unitId" value={unitId ?? ""} />
      <input type="hidden" name="source" value={source} />
      {/* Honeypot */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      {unitTitle && (
        <div className="bg-[#EBEBEB] border border-[#E5E5E5] px-4 py-3 text-sm text-[#555555]">
          Enquiring about: <span className="text-black font-medium">{unitTitle}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="eq-name" className="block text-sm font-medium text-[#555555] mb-1.5">
            Full Name <span className="text-[#2a3065]">*</span>
          </label>
          <input
            id="eq-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full bg-white border border-[#E5E5E5] text-black placeholder-[#C8C8C8] px-4 py-3 text-sm focus:outline-none focus:border-[#2a3065] transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="eq-email" className="block text-sm font-medium text-[#555555] mb-1.5">
            Email <span className="text-[#2a3065]">*</span>
          </label>
          <input
            id="eq-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full bg-white border border-[#E5E5E5] text-black placeholder-[#C8C8C8] px-4 py-3 text-sm focus:outline-none focus:border-[#2a3065] transition-colors"
            placeholder="you@business.com"
          />
        </div>
        <div>
          <label htmlFor="eq-phone" className="block text-sm font-medium text-[#555555] mb-1.5">
            Phone
          </label>
          <input
            id="eq-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="w-full bg-white border border-[#E5E5E5] text-black placeholder-[#C8C8C8] px-4 py-3 text-sm focus:outline-none focus:border-[#2a3065] transition-colors"
            placeholder="04xx xxx xxx"
          />
        </div>
        <div>
          <label htmlFor="eq-business" className="block text-sm font-medium text-[#555555] mb-1.5">
            Business Name
          </label>
          <input
            id="eq-business"
            name="businessName"
            type="text"
            autoComplete="organization"
            className="w-full bg-white border border-[#E5E5E5] text-black placeholder-[#C8C8C8] px-4 py-3 text-sm focus:outline-none focus:border-[#2a3065] transition-colors"
            placeholder="Optional"
          />
        </div>
      </div>

      {showInterestField && (
        <div>
          <label htmlFor="eq-interest" className="block text-sm font-medium text-[#555555] mb-1.5">
            I&apos;m interested in
          </label>
          <select
            id="eq-interest"
            name="spaceType"
            className="w-full bg-white border border-[#E5E5E5] text-black px-4 py-3 text-sm focus:outline-none focus:border-[#2a3065] transition-colors"
          >
            {INTEREST_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="eq-message" className="block text-sm font-medium text-[#555555] mb-1.5">
          Message <span className="text-[#2a3065]">*</span>
        </label>
        <textarea
          id="eq-message"
          name="message"
          required
          rows={5}
          className="w-full bg-white border border-[#E5E5E5] text-black placeholder-[#C8C8C8] px-4 py-3 text-sm focus:outline-none focus:border-[#2a3065] transition-colors resize-none"
          placeholder={
            unitId
              ? `I'm interested in unit ${unitId}…`
              : "Tell us what you need — size, how you'll use the space, when you need it…"
          }
        />
      </div>

      {state.error && (
        <div className="flex items-center gap-2 text-[#C8922A] text-sm bg-[#C8922A]/10 border border-[#C8922A]/30 px-4 py-3">
          <AlertCircle size={15} className="shrink-0" />
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="flex items-center gap-2 text-[#2a3065] text-sm bg-[#2a3065]/10 border border-[#2a3065]/30 px-4 py-3">
          <CheckCircle size={15} className="shrink-0" />
          Thanks — we&apos;ll be in touch within one business day.
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex items-center gap-2 bg-[#2a3065] hover:bg-[#1e2a54] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 text-sm transition-colors duration-200"
      >
        <Send size={14} />
        {pending ? "Sending…" : "Send Enquiry"}
      </button>

      <p className="text-[#6B6B6B] text-xs">
        Prices exclude GST and outgoings. We respond within one business day.
      </p>
    </form>
  );
}
