import { useState, useEffect } from "react";
import styles from "./ContactForm.module.css";
import { useScrollAnimation } from '../utils/useScrollAnimation';

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

  useScrollAnimation();
  
  useEffect(() => {
    // Trigger initial animation check when component mounts
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.classList.add('visible');
      }
    });
  }, []);

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
      <h2 className={`${styles.heading} animate-on-scroll`}>Contact</h2>

      {submitted && (
        <p className={`${styles.success} animate-on-scroll`}>Thanks! Your message has been sent.</p>
      )}

      <form className={`${styles.form} animate-on-scroll`} style={{ transitionDelay: '0.2s' }} onSubmit={handleSubmit}>
        <label className={`${styles.label} animate-on-scroll`} style={{ transitionDelay: '0.3s' }}>
          Name
          <input
            className={styles.input}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label className={`${styles.label} animate-on-scroll`} style={{ transitionDelay: '0.4s' }}>
          Email
          <input
            className={styles.input}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label className={`${styles.label} animate-on-scroll`} style={{ transitionDelay: '0.5s' }}>
          Message
          <textarea
            className={styles.textarea}
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </label>

        <button className="btn-primary animate-on-scroll" type="submit" style={{ transitionDelay: '0.6s' }}>
          Send
        </button>
      </form>
    </section>
  );
}

export default ContactForm;
