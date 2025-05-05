import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const Admin = () => {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    description: "",
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "jobs"), {
        ...form,
        createdAt: Timestamp.now(),
      });
      setSuccess("Job posted successfully!");
      setForm({
        title: "",
        company: "",
        location: "",
        type: "",
        description: "",
      });
    } catch (err) {
      console.error("Error adding job:", err);
      setSuccess("Failed to post job.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>

      {success && <p className="mb-4 text-green-600">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="type"
          placeholder="Job Type (Full-Time, Remote, etc.)"
          value={form.type}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={4}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default Admin;
