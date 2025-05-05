// src/pages/JobDetail.jsx
import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const docRef = doc(db, "jobs", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setJob({ id: docSnap.id, ...docSnap.data() });
        } else {
          setJob(null);
        }
      } catch (err) {
        console.error("Error fetching job:", err);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!job) {
    return <div className="p-6 text-center text-red-600">Job not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">{job.title}</h1>
      <p className="text-lg text-gray-700">{job.company}</p>
      <p className="text-sm text-gray-500 mb-4">{job.location}</p>
      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mb-4">
        {job.type}
      </span>
      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
        {job.description}
      </p>

      <Link
        to="/"
        className="inline-block mt-6 text-blue-600 hover:underline text-sm"
      >
        ← Back to Job Listings
      </Link>
    </div>
  );
};

export default JobDetail;
