// ContactUs.tsx

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Ensure this component exists
import { Ubuntu } from "next/font/google";

interface ContactUsProps {
  onBack: () => void;
}

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["500", "700"],
});

const ContactUs: FC<ContactUsProps> = ({ onBack }) => {
  return (
    <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full px-4 sm:px-0">
      <h2 className={`${ubuntu.className} text-3xl font-serif mb-2`}>
        Contact Us
      </h2>
      <p className="text-gray-500 mb-8">
        Please fill out the form below, and we'll get back to you shortly.
      </p>

      <form className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm" htmlFor="name">
            Name
          </label>
          <Input
            id="name"
            placeholder="Enter your name"
            type="text"
            className="h-12 rounded-xl border-gray-200"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            placeholder="Enter your email"
            type="email"
            className="h-12 rounded-xl border-gray-200"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm" htmlFor="phone">
            Phone Number
          </label>
          <Input
            id="phone"
            placeholder="Enter your phone number"
            type="tel"
            className="h-12 rounded-xl border-gray-200"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm" htmlFor="issue">
            Issue
          </label>
          <Textarea
            id="issue"
            placeholder="Describe your issue"
            className="rounded-xl border-gray-200"
          />
        </div>

        <Button className="w-full h-12 rounded-xl bg-black text-white">
          Submit
        </Button>
      </form>

      <div className="text-center mt-8">
        <Button
          variant="link"
          className="text-blue-600 text-sm font-medium hover:underline"
          onClick={onBack}
        >
          Back to Sign In
        </Button>
      </div>
    </div>
  );
};

export default ContactUs;
