import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
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
    applyLink: "",
  });
  const [success, setSuccess] = useState("");
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const querySnapshot = await getDocs(collection(db, "jobs"));
      const jobList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobList);
    };
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingJob) {
        const jobRef = doc(db, "jobs", editingJob.id);
        await updateDoc(jobRef, { ...form, updatedAt: Timestamp.now() });
        setSuccess("Job updated successfully!");
      } else {
        await addDoc(collection(db, "jobs"), {
          ...form,
          createdAt: Timestamp.now(),
        });
        setSuccess("Job posted successfully!");
      }

      // Reset form and editing state
      setForm({
        title: "",
        company: "",
        location: "",
        type: "",
        description: "",
        applyLink: "",
      });
      setEditingJob(null);
    } catch (err) {
      console.error("Error adding/updating job:", err);
      setSuccess("Failed to post/update job.");
    }
  };

  const handleEdit = (job) => {
    setForm({
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      description: job.description,
      applyLink: job.applyLink || "",
    });
    setEditingJob(job);
  };

  const handleDelete = async (jobId) => {
    try {
      const jobRef = doc(db, "jobs", jobId);
      await deleteDoc(jobRef);
      setSuccess("Job removed successfully!");
      setJobs(jobs.filter((job) => job.id !== jobId));
    } catch (err) {
      console.error("Error deleting job:", err);
      setSuccess("Failed to remove job.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {editingJob ? "Edit Job" : "Post a Job"}
      </h1>

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
        <input
          name="applyLink"
          placeholder="Application Link or Email"
          value={form.applyLink}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingJob ? "Update Job" : "Post Job"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-6">Current Job Listings</h2>
      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="p-4 border rounded-md flex justify-between items-start gap-4"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <p>{job.company}</p>
                <p>{job.location}</p>
                <p>{job.type}</p>
                <p className="mt-2">{job.description}</p>
                {job.applyLink && (
                  <p className="text-sm mt-2">
                    Apply:{" "}
                    <a
                      href={job.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {job.applyLink}
                    </a>
                  </p>
                )}
              </div>
              <div className="space-x-2 mt-2">
                <button
                  onClick={() => handleEdit(job)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Admin;
