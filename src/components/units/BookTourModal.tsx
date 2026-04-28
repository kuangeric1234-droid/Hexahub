"use client";

import { useState } from "react";
import { X, CalendarDays } from "lucide-react";

const PORTAL_ID = "442586544";
const FORM_ID = "f6a91f18-e7c8-434e-93c2-8b4dd23cd972";

const TIME_SLOTS = ["9:00am", "10:00am", "11:00am", "1:00pm", "2:00pm", "3:00pm", "4:00pm"];
const INTEREST_OPTIONS = ["Leasing", "Buying", "General Enquiry"];

interface Props {
  unitTitle: string;
  unitId: string;
  buttonClassName?: string;
}

const inputClass =
  "border border-[#E5E5E5] px-3 py-2.5 text-sm focus:outline-none focus:border-[#2a3065] text-black bg-white w-full";

export default function BookTourModal({ unitTitle, unitId, buttonClassName }: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    interest: "",
    date: "",
    time: "",
  });

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function close() {
    setOpen(false);
    setStep(1);
    setSubmitted(false);
    setError("");
    setForm({ firstName: "", lastName: "", email: "", phone: "", company: "", interest: "", date: "", time: "" });
  }

  async function submit() {
    setSubmitting(true);
    setError("");

    const dateTs = new Date(form.date + "T00:00:00.000Z").getTime();

    const payload = {
      fields: [
        { objectTypeId: "0-1", name: "firstname", value: form.firstName },
        { objectTypeId: "0-1", name: "lastname", value: form.lastName },
        { objectTypeId: "0-1", name: "email", value: form.email },
        { objectTypeId: "0-1", name: "phone", value: form.phone },
        { objectTypeId: "0-1", name: "company", value: form.company },
        { objectTypeId: "0-1", name: "what_are_you_interested_in", value: form.interest },
        { objectTypeId: "0-1", name: "preferred_tour_date", value: dateTs },
        { objectTypeId: "0-1", name: "preferred_tour_time", value: form.time },
        { objectTypeId: "0-1", name: "unit_of_interest", value: `${unitId} — ${unitTitle}` },
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
    };

    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className={buttonClassName ?? "w-full flex items-center justify-center gap-2 border border-[#2a3065] text-[#2a3065] hover:bg-[#2a3065] hover:text-white text-sm font-semibold py-2.5 transition-colors duration-200 mt-3"}
      >
        <CalendarDays size={14} />
        Book a Tour
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="bg-white w-full max-w-lg shadow-2xl relative">
            {/* Header */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-[#E5E5E5]">
              <div>
                <p className="text-[10px] text-[#2a3065] uppercase tracking-widest font-bold mb-1">
                  Book a Tour
                </p>
                <h2 className="text-lg font-bold text-black leading-tight">{unitTitle}</h2>
                <p className="text-xs text-[#6B6B6B] mt-0.5">{unitId}</p>
              </div>
              <button
                onClick={close}
                className="text-[#6B6B6B] hover:text-black transition-colors mt-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-6">
              {submitted ? (
                <div className="text-center py-8">
                  <p className="text-2xl font-bold text-black mb-2">Request received!</p>
                  <p className="text-[#6B6B6B] text-sm max-w-xs mx-auto">
                    We&apos;ll be in touch shortly to confirm your tour of{" "}
                    <span className="font-semibold text-black">{unitTitle}</span>.
                  </p>
                  <button
                    onClick={close}
                    className="mt-6 bg-[#2a3065] hover:bg-[#1e2a54] text-white px-6 py-2.5 text-sm font-semibold transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : step === 1 ? (
                <>
                  <p className="text-sm text-[#6B6B6B] mb-5">
                    Fill in your details and we&apos;ll confirm your inspection time.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input
                      placeholder="First name *"
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      className={inputClass}
                    />
                    <input
                      placeholder="Last name *"
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input
                      placeholder="Email address *"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className={inputClass}
                    />
                    <input
                      placeholder="Phone number *"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <input
                    placeholder="Company name"
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    className={`${inputClass} mb-3`}
                  />
                  <select
                    value={form.interest}
                    onChange={(e) => update("interest", e.target.value)}
                    className={`${inputClass} mb-5`}
                  >
                    <option value="">What are you interested in? *</option>
                    {INTEREST_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>

                  {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

                  <button
                    onClick={() => {
                      if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.interest) {
                        setError("Please fill in all required fields.");
                        return;
                      }
                      setError("");
                      setStep(2);
                    }}
                    className="w-full bg-[#2a3065] hover:bg-[#1e2a54] text-white font-semibold py-3 text-sm transition-colors"
                  >
                    Next — Choose a time
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm text-[#6B6B6B] mb-5">
                    When would you like to inspect{" "}
                    <span className="font-semibold text-black">{unitTitle}</span>?
                  </p>
                  <input
                    type="date"
                    value={form.date}
                    min={today}
                    onChange={(e) => update("date", e.target.value)}
                    className={`${inputClass} mb-3`}
                  />
                  <select
                    value={form.time}
                    onChange={(e) => update("time", e.target.value)}
                    className={`${inputClass} mb-5`}
                  >
                    <option value="">Select a time *</option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>

                  {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

                  <div className="flex gap-3">
                    <button
                      onClick={() => { setStep(1); setError(""); }}
                      className="flex-1 border border-[#E5E5E5] hover:border-[#999] text-[#555555] hover:text-black font-semibold py-3 text-sm transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        if (!form.date || !form.time) {
                          setError("Please select a date and time.");
                          return;
                        }
                        submit();
                      }}
                      disabled={submitting}
                      className="flex-1 bg-[#2a3065] hover:bg-[#1e2a54] text-white font-semibold py-3 text-sm transition-colors disabled:opacity-60"
                    >
                      {submitting ? "Booking..." : "Book my tour"}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Step indicator */}
            {!submitted && (
              <div className="px-6 pb-5 flex gap-1.5">
                <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 1 ? "bg-[#2a3065]" : "bg-[#E5E5E5]"}`} />
                <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 2 ? "bg-[#2a3065]" : "bg-[#E5E5E5]"}`} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
