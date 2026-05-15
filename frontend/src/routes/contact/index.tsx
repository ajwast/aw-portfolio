import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  message: string;
};

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

    const [submitted, setSubmitted] = useState<boolean>(false);