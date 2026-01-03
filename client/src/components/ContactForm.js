import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const ContactForm = ({ refreshContacts }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch(`${API_URL}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess("Contact submitted successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setErrors({});
        refreshContacts();

        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Contact</h3>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      {errors.name && <p className="error">{errors.name}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <input
        type="text"
        name="phone"
        placeholder="Phone (10 digits)"
        value={formData.phone}
        onChange={(e) => {
          if (/^\d*$/.test(e.target.value)) {
            setFormData({ ...formData, phone: e.target.value });
          }
        }}
      />
      {errors.phone && <p className="error">{errors.phone}</p>}

      <textarea
        name="message"
        placeholder="Message (optional)"
        value={formData.message}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="primary"
        disabled={
          !formData.name ||
          !formData.email ||
          !/^\d{10}$/.test(formData.phone)
        }
      >
        Submit
      </button>

      {success && <p className="success">{success}</p>}
    </form>
  );
};

export default ContactForm;
