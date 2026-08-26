"use client";

import { FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { emailjsConfig, toTemplateParams } from "@/lib/emailjs";

export type SendState = "idle" | "sending" | "sent" | "error";

/** Shape EmailJS rejects with — a status code plus the server's message. */
interface EmailJSError {
  status?: number;
  text?: string;
}

/**
 * The contact form's send cycle: honeypot, config check, submit, error
 * normalisation.
 *
 * Lifted out of the Contact section, which was 223 lines of state machine and
 * markup in one component.
 */
export function useContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<SendState>("idle");
  const [errorDetail, setErrorDetail] = useState<string>("");

  const sendEmail = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const form = formRef.current;
    if (!form || status === "sending") return;

    const data = new FormData(form);
    const value = (field: string) => String(data.get(field) ?? "").trim();

    // Bots fill in every field they can see, including the hidden one.
    if (value("company")) {
      setStatus("sent");
      form.reset();
      return;
    }

    // A deploy missing the NEXT_PUBLIC_EMAILJS_* variables would otherwise fail
    // deep inside EmailJS with an opaque message.
    const config = emailjsConfig;
    if (!config) {
      setErrorDetail("Contact form is not configured");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorDetail("");

    try {
      await emailjs.send(
        config.serviceId,
        config.templateId,
        toTemplateParams({
          name: value("name"),
          email: value("email"),
          subject: value("subject"),
          message: value("message"),
        }),
        {
          publicKey: config.publicKey,
          // Cheap client-side brake on repeat submissions. The real limit
          // belongs in the EmailJS dashboard, since anyone can bypass this.
          limitRate: { id: "contact", throttle: 10_000 },
        }
      );

      setStatus("sent");
      form.reset();
    } catch (error) {
      const { status: code, text } = (error ?? {}) as EmailJSError;

      // Without this the failure is invisible: an earlier version passed an
      // onError callback that ignored its argument, so a misconfigured template
      // or a blocked domain looked identical to a network drop.
      setErrorDetail(
        [code && `HTTP ${code}`, text].filter(Boolean).join(" — ") ||
          "Network request failed"
      );
      // eslint-disable-next-line no-console
      console.error("EmailJS send failed:", error);
      setStatus("error");
    }
  };

  return {
    formRef,
    status,
    errorDetail,
    sendEmail,
    isSending: status === "sending",
  };
}

export default useContactForm;
