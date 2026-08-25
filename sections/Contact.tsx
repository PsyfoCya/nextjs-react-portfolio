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

const EMAIL = "psyfohadebe@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/siyabonga-hadebe-25385620b";

type SendState = "idle" | "sending" | "sent" | "error";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null!);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [status, setStatus] = useState<SendState>("idle");

  const sendEmail = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setStatus("sending");
    emailjs
      .sendForm(
        "service_ekwydfj",
        "template_j7rrh0n",
        formRef.current,
        "QGhpJXJQYGvV8ZiUL"
      )
      .then(
        () => {
          setStatus("sent");
          formRef.current?.reset();
        },
        () => {
          setStatus("error");
        }
      );
  };

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
              />
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                icon={<MdEmail />}
              />
            </div>
            <div className="flex item-center justify-between mb-4 gap-8">
              <Input
                name="subject"
                type="text"
                placeholder="Subject"
                icon={<MdSubject />}
              />
            </div>

            {/* TextArea Message */}
            <TextArea
              name="message"
              placeholder="What would you like to talk about?"
              icon={<FaProjectDiagram />}
            />

            <div className="w-full flex items-center justify-between gap-4">
              <p
                role="status"
                aria-live="polite"
                className="text-sm text-secondary-foreground"
              >
                {statusMessage[status]}
              </p>
              <div onClick={() => btnRef.current?.click()}>
                <Button className={"!w-44 !py-3 !text-xl"}>
                  {status === "sending" ? "Sending" : "Send"} <SiMinutemailer />
                </Button>
              </div>
              <button type="submit" hidden ref={btnRef}></button>
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
