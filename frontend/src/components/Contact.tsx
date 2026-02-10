import { useState } from "react";
import styles from "./ContactForm.module.css";

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

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

    console.log("Form submitted:", formData);

    setSubmitted(true);

    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Contact</h2>

      {submitted && (
        <p className={styles.success}>Thanks! Your message has been sent.</p>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label className={styles.label}>
          Message
          <textarea
            className={styles.textarea}
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </label>

        <button className={styles.button} type="submit">
          Send
        </button>
      </form>
    </section>
  );
}

export default ContactForm;
