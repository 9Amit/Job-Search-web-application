import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

const Admin = () => {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    description: "",
  });
  const [jobs, setJobs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchJobs = async () => {
    const snapshot = await getDocs(collection(db, "jobs"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        const jobRef = doc(db, "jobs", editId);
        await updateDoc(jobRef, form);
        setMessage("Job updated!");
      } else {
        await addDoc(collection(db, "jobs"), {
          ...form,
          createdAt: Timestamp.now(),
        });
        setMessage("Job posted!");
      }

      setForm({
        title: "",
        company: "",
        location: "",
        type: "",
        description: "",
      });
      setEditId(null);
      fetchJobs();
    } catch (err) {
      console.error("Error submitting job:", err);
      setMessage("Failed to submit job.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "jobs", id));
      setMessage("Job deleted.");
      fetchJobs();
    } catch (err) {
      console.error("Error deleting job:", err);
      setMessage("Failed to delete job.");
    }
  };

  const handleEdit = (job) => {
    setForm({
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      description: job.description,
    });
    setEditId(job.id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {editId ? "Edit Job" : "Post a Job"}
      </h1>

      {message && <p className="mb-4 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="type"
          placeholder="Job Type"
          value={form.type}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editId ? "Update Job" : "Post Job"}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-2">Posted Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        jobs.map((job) => (
          <div key={job.id} className="border p-4 mb-4 rounded shadow-sm">
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <p className="text-sm">
              {job.company} — {job.location}
            </p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEdit(job)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(job.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Admin;
