"use client";

import ContactCard from "@/components/card/ContactCard";
import Heading from "@/components/heading/Heading";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import { FaProjectDiagram } from "react-icons/fa";
import { FaLinkedin, FaUser } from "react-icons/fa6";
import { MdEmail, MdSubject } from "react-icons/md";
import { SiMinutemailer } from "react-icons/si";
import { useContactForm, type SendState } from "@/lib/useContactForm";
import Section from "@/components/ui/Section";
import { EMAIL, socialLinks } from "@/data/Links";

const Contact = () => {
  const { formRef, status, errorDetail, sendEmail, isSending } =
    useContactForm();

  return (
    <Section>
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
              href={socialLinks.linkedin}
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
    </Section>
  );
};

export default Contact;

const statusMessage: Record<SendState, string> = {
  idle: "",
  sending: "Sending…",
  sent: "Thanks — message sent. I'll get back to you.",
  error: `Something went wrong. Email me directly at ${EMAIL}.`,
};
