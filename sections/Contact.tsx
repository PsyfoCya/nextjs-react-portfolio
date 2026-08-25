"use client";

import ContactCard from "@/components/card/ContactCard";
import Heading from "@/components/heading/Heading";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import { FormEvent, useRef, useState } from "react";
import { FaProjectDiagram } from "react-icons/fa";
import { FaLinkedin, FaUser } from "react-icons/fa6";
import { MdEmail, MdSubject } from "react-icons/md";
import { SiMinutemailer } from "react-icons/si";
import emailjs from "@emailjs/browser";
import { emailjsConfig, toTemplateParams } from "@/lib/emailjs";

const EMAIL = "psyfohadebe@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/siyabonga-hadebe-25385620b";

type SendState = "idle" | "sending" | "sent" | "error";

/** Shape EmailJS rejects with — a status code plus the server's message. */
interface EmailJSError {
  status?: number;
  text?: string;
}

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<SendState>("idle");
  const [errorDetail, setErrorDetail] = useState<string>("");

  const sendEmail = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

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

    setStatus("sending");
    setErrorDetail("");

    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        toTemplateParams({
          name: value("name"),
          email: value("email"),
          subject: value("subject"),
          message: value("message"),
        }),
        {
          publicKey: emailjsConfig.publicKey,
          // Cheap client-side brake on repeat submissions. The real limit
          // belongs in the EmailJS dashboard, since anyone can bypass this.
          limitRate: { id: "contact", throttle: 10_000 },
        }
      );

      setStatus("sent");
      form.reset();
    } catch (error) {
      const { status: code, text } = (error ?? {}) as EmailJSError;

      // Without this the failure is invisible: the previous version passed an
      // onError callback that ignored its argument, so a misconfigured
      // template or a blocked domain looked identical to a network drop.
      setErrorDetail(
        [code && `HTTP ${code}`, text].filter(Boolean).join(" — ") ||
          "Network request failed"
      );
      // eslint-disable-next-line no-console
      console.error("EmailJS send failed:", error);
      setStatus("error");
    }
  };

  const isSending = status === "sending";

  return (
    <div className="pt-16 sm:pt-24 px-3 lg:px-8">
      <Heading
        number="05"
        title_1="Contact"
        title_2="Me"
        svgText="EMAIL IS THE FASTEST WAY TO REACH ME"
      />
      <Card>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Contact Cards */}
          <div className="flex flex-col gap-8">
            <ContactCard
              title="Email me directly"
              text={EMAIL}
              icon={<MdEmail className="fill-[#333] text-lg" />}
              btnText="Email Me"
              href={`mailto:${EMAIL}`}
            />
            <ContactCard
              title="Or find me on"
              text="LinkedIn"
              icon={<FaLinkedin className="fill-[#333] text-lg" />}
              btnText="Connect"
              href={LINKEDIN}
            />
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="lg:col-span-2 !bg-secondary-background border border-border rounded-lg space-y-6 relative overflow-hidden py-5 px-[25px] shadow-md"
          >
            <div className="flex flex-col lg:flex-row item-center justify-between mb-4 gap-8">
              <Input
                name="name"
                type="text"
                placeholder="Full Name"
                icon={<FaUser />}
                autoComplete="name"
                required
                disabled={isSending}
              />
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                icon={<MdEmail />}
                autoComplete="email"
                required
                disabled={isSending}
              />
            </div>
            <div className="flex item-center justify-between mb-4 gap-8">
              <Input
                name="subject"
                type="text"
                placeholder="Subject"
                icon={<MdSubject />}
                required
                disabled={isSending}
              />
            </div>

            {/* TextArea Message */}
            <TextArea
              name="message"
              placeholder="What would you like to talk about?"
              icon={<FaProjectDiagram />}
              required
              disabled={isSending}
            />

            {/* Honeypot — invisible to people, irresistible to bots. */}
            <div aria-hidden className="absolute -left-[9999px] top-0">
              <label>
                Company
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>

            <div className="w-full flex flex-wrap items-center justify-between gap-4">
              <p
                role="status"
                aria-live="polite"
                className="text-sm text-secondary-foreground"
              >
                {status === "error"
                  ? `${statusMessage.error}${
                      errorDetail ? ` (${errorDetail})` : ""
                    }`
                  : statusMessage[status]}
              </p>
              <button
                type="submit"
                disabled={isSending}
                aria-label="Send message"
                className="link rounded-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Button className={"!w-44 !py-3 !text-xl"}>
                  {isSending ? "Sending" : "Send"} <SiMinutemailer />
                </Button>
              </button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Contact;

const statusMessage: Record<SendState, string> = {
  idle: "",
  sending: "Sending…",
  sent: "Thanks — message sent. I'll get back to you.",
  error: `Something went wrong. Email me directly at ${EMAIL}.`,
};
