import ContactCard from "@/components/card/ContactCard";
import Heading from "@/components/heading/Heading";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import SelectInput from "@/components/ui/SelectInput";
import TextArea from "@/components/ui/TextArea";
import { FormEvent, useRef, useState } from "react";
import { FaProjectDiagram } from "react-icons/fa";
import { FaPhoneVolume, FaUser } from "react-icons/fa6";
import { MdEmail, MdSubject } from "react-icons/md";
import { SiMinutemailer } from "react-icons/si";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null!);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [services, setServices] = useState<string[]>([]);
  const [budgets, setBudgets] = useState<string[]>([]);

  const sendEmail = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_ekwydfj",
        "template_j7rrh0n",
        formRef.current,
        "QGhpJXJQYGvV8ZiUL"
      )
      .then(
        (res) => {
          console.log(res.text);
          console.log("Email sent successfully");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  console.log("budgets", budgets);
  console.log("services", services);
  return (
    <div className="pt-24 px-3 lg:px-8">
      <Heading number="03" title_1="Contact" title_2="Me" />
      <Card>
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
          {/* Contact Cards */}
          <div className="flex flex-col gap-8">
            <ContactCard
              title="Call Me directly at"
              text="069 378 8872"
              icon={<FaPhoneVolume className="fill-[#333] text-lg" />}
              btnText="Call Me"
            />
            <ContactCard
              title="Chat with me directly"
              text="psyfohadebe@gmail.com"
              icon={<MdEmail className="fill-[#333] text-lg" />}
              btnText="Email Me"
            />
          </div>
          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="lg:col-span-2 !bg-secondary-background border border-border rounded-lg space-y-6 relative overflow-hidden py-5 px-[25px] shadow-md"
          >
            <div className="flex flex-col lg:flex-row item-center justify- between mb-4 gap-8">
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
            {/* Multiple Select Wrapper */}
            <div className="flex flex-col gap-6 ">
              <div className="space-y-6">
                <h1 className="font-bold text-lg">
                  What services are you looking for?
                </h1>
                <div className="flex flex-wrap items-center justify-between mb-4 gap-8">
                  {/* Services */}
                  {serviceOptions.map((service) => (
                    <SelectInput
                      key={service.id}
                      type="checkbox"
                      id={service.id}
                      text={service.text}
                      selectedOptions={services}
                      setSelectedOptions={setServices}
                      allowMultiple
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Multiple Select Wrapper */}
            <div className="flex flex-col gap-6 ">
              <div className="space-y-6">
                <h1 className="font-bold text-lg"> What is your budget?</h1>
                <div className="flex flex-wrap items-center justify-between mb-4 gap-8">
                  {/* Budget Options */}
                  {budgetOptions.map((budget) => (
                    <SelectInput
                      key={budget.id}
                      type="radio"
                      id={budget.id}
                      text={budget.text}
                      selectedOptions={budgets}
                      setSelectedOptions={setBudgets}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* TextArea Message */}
            <TextArea
              name="message"
              placeholder="Tell me about your project"
              icon={<FaProjectDiagram />}
            />
            <div className="w-full flex justify-end">
              <div onClick={() => btnRef.current?.click()}>
                <Button className={"!w-44 !py-3 !text-xl"}>
                  Send <SiMinutemailer />
                </Button>
              </div>
              {/* Hidden Services and Budget inputs */}
              <div className="hidden">
                <input
                  type="text"
                  value={services.join(", ")}
                  name="services"
                  hidden
                />
                <input
                  type="text"
                  value={budgets.join(", ")}
                  name="budget"
                  hidden
                />
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

const serviceOptions = [
  {
    id: "Web Design",
    text: "Web Design",
  },
  {
    id: "Design Implementation",
    text: "Design Implementation",
  },
  {
    id: "Web Development",
    text: "Web Development",
  },
  {
    id: "Logo Design",
    text: "Logo Design",
  },
];

const budgetOptions = [
  {
    id: "less than 1k",
    text: "< R1 000",
  },
  {
    id: "between 1k and 2k",
    text: "R1 000 - R2 0000",
  },
  {
    id: "between 2k and 5k",
    text: "R2 000 - R5 000",
  },
  {
    id: "more than 5k",
    text: "> R5 000",
  },
];
