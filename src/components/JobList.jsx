import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const JobList = () => {
  const jobs = [
    { title: 'Software Engineer', location: 'San Francisco, CA', requirements: 'Bachelor’s degree in Computer Science, experience with JavaScript, Node.js, and React' },
    { title: 'Frontend Developer', location: 'New York, NY', requirements: 'Experience with HTML, CSS, JavaScript, and popular frontend frameworks' },
    { title: 'Full Stack Developer', location: 'Seattle, WA', requirements: 'Proficiency in both frontend and backend technologies like JavaScript, Node.js, React, and SQL' },
    // Add more job entries here
  ];

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Jobs</h1>
      <ul className="list-group">
        {jobs.map((job, index) => (
          <li key={index} className="list-group-item">
            <h4>{job.title}</h4>
            <p>{job.location}</p>
            <p>Requirements: {job.requirements}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
