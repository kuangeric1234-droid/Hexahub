"use client";

import { useEffect, useId } from "react";

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: {
          portalId: string;
          formId: string;
          region: string;
          target: string;
          onFormReady?: (form: HTMLFormElement) => void;
          onFormSubmitted?: () => void;
        }) => void;
      };
    };
    gtag?: (...args: unknown[]) => void;
  }
}

type Props = {
  portalId: string;
  formId: string;
  region: string;
  eventName: string;
};

export default function HubSpotForm({ portalId, formId, region, eventName }: Props) {
  const reactId = useId();
  // Sanitise useId output (contains colons) to produce a valid HTML id attribute
  const targetId = `hs-form-${reactId.replace(/[^a-zA-Z0-9]/g, "")}-${formId.replace(/[^a-zA-Z0-9]/g, "")}`;

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const createForm = () => {
      if (!window.hbspt) return;
      // Clear any previous render before (re-)creating
      target.innerHTML = "";
      window.hbspt.forms.create({
        portalId,
        formId,
        region,
        target: `#${targetId}`,
        onFormReady: (form) => {
          const input = form.querySelector<HTMLInputElement>('input[name="event_name"]');
          if (input) {
            input.value = eventName;
            input.dispatchEvent(new Event("input", { bubbles: true }));
          }
        },
        onFormSubmitted: () => {
          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "form_submit_event_rsvp", {
              form_name: "event_rsvp",
              form_id: formId,
            });
          }
        },
      });
    };

    // Script is already loaded — create the form immediately
    if (window.hbspt) {
      createForm();
      return () => {
        target.innerHTML = "";
      };
    }

    const SCRIPT_ID = "hubspot-embed-script";
    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = `https://js-${region}.hsforms.net/forms/embed/v2.js`;
      script.async = true;
      script.onload = createForm;
      document.head.appendChild(script);
    } else {
      // Script tag exists but may not have fired onload yet — listen for it
      script.addEventListener("load", createForm);
    }

    return () => {
      target.innerHTML = "";
    };
  }, [portalId, formId, region, eventName, targetId]);

  return (
    <div style={{ minHeight: 600 }}>
      <div id={targetId} />
    </div>
  );
}
