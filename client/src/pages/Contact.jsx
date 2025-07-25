import React, { useState } from "react";
import Input from "../components/Input";
import Genbutton from "../components/Genbutton";
import Textarea from "../components/Textarea";

export default function ContactUsPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const width = "w-[786px]";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message Sent:", {
      fullName,
      email,
      subject,
      message,
    });
    // TODO: send data to backend or email service
  };

  return (
    <div className="min-h-[750px] w-full bg-white flex flex-col justify-center items-center gap-8">
      <h1 className="text-[30px] font-semibold font-Inter text-center mb-10">
        Contact Us
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 w-full max-w-3xl"
      >
        {/* Full Name */}
        <Input
          name="Full Name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
          w={width}
        />

        {/* Email */}
        <Input
          name="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          w={width}
        />

        {/* Subject */}
        <Input
          name="Subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter subject"
          w={width}
        />

        {/* Message */}
        <Textarea />

        {/* Submit Button */}
        <div className="w-full flex justify-center mt-4">
          <Genbutton
            type="submit"
            w="w-[290px]"
            h="h-[64px]"
            bg="bg-black"
            text="Send Message"
            textsz="text-sm"
            textco="text-white"
            hover="hover:bg-gray-900"
          />
        </div>
      </form>
    </div>
  );
}
