import React, { useState } from "react";
import Input from "../components/Input";
import Genbutton from "../components/Genbutton";
import Textarea from "../components/Textarea";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function ContactUsPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !subject || !message) {
      toast.error("Please fill out all fields.", { duration: 2000 });
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/contact", {
        fullName,
        email,
        subject,
        message,
      });

      toast.success("Message sent successfully!", { duration: 2000 });

      setFullName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      toast.error("Failed to send message. Please try again later.", { duration: 3000 });
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-center items-center px-4 py-8 sm:py-12 lg:py-16">
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-Inter text-center mb-6 sm:mb-10">
        Contact Us
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-3xl flex flex-col gap-6 sm:gap-8"
      >
        <Input
          name="Full Name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
          w="w-full"
        />

        <Input
          name="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          w="w-full"
        />

        <Input
          name="Subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter subject"
          w="w-full"
        />

        <div className="w-full">
          <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>

        <div className="w-full flex justify-center mt-2 sm:mt-4">
          <Genbutton
            type="submit"
            w="w-full sm:w-[290px]"
            h="h-14 sm:h-16"
            bg="bg-black"
            text="Send Message"
            textsz="text-sm sm:text-base"
            textco="text-white"
            hover="hover:bg-gray-900"
          />
        </div>
      </form>
    </div>
  );
}
