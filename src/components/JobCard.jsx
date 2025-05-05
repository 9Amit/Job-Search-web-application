// src/components/JobCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="bg-white shadow-md p-5 rounded-2xl border border-gray-100">
      <h2 className="text-xl font-semibold text-blue-700">{job.title}</h2>
      <p className="text-gray-700">{job.company}</p>
      <p className="text-sm text-gray-500">{job.location}</p>
      <p className="text-xs text-gray-400 mt-2">{job.type}</p>

      <Link
        to={`/job/${job.id}`}
        className="inline-block mt-4 text-blue-500 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
};

export default JobCard;
