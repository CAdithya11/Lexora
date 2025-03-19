import React, { useState } from 'react';
import { Pencil } from "lucide-react";

const JobSkillsTable = () => {
  // Sample data - replace with your actual data or state management
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Frontend Developer', skill: 'React, JavaScript, HTML/CSS', progress: 75 },
    { id: 2, title: 'Backend Developer', skill: 'Node.js, Express, MongoDB', progress: 60 },
    { id: 3, title: 'UX Designer', skill: 'Figma, User Research, Wireframing', progress: 85 },
    { id: 4, title: 'DevOps Engineer', skill: 'Docker, Kubernetes, CI/CD', progress: 10 },
  ]);

  // Handler functions
  const handleView = (id) => {
    console.log(`Viewing job ${id}`);
    // Add your view logic here
  };

  const handleDelete = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const handleAdd = () => {
    // Example of adding a new empty job
    const newId = jobs.length > 0 ? Math.max(...jobs.map(job => job.id)) + 1 : 1;
    setJobs([...jobs, { id: newId, title: '', skill: '', progress: 0 }]);
  };

  return (
    <div className="container mx-auto px-4 py-4">
      
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-blue-100">
        <table className="min-w-full divide-y divide-blue-200">
          <thead className="bg-blue-50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                Job Name
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                Skill
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                Progress
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-100">
            {jobs.map((job, index) => (
              <tr key={job.id} className={`hover:bg-blue-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-blue-50/30'}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{job.title}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600">{job.skill}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                    <div 
                      className={`h-3 rounded-full ${
                        job.progress < 40 ? 'bg-blue-300' : 
                        job.progress < 70 ? 'bg-blue-500' : 'bg-blue-700'
                      }`} 
                      style={{ width: `${job.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-blue-800">{job.progress}%</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleUpdate(job.id)}
                      className="text-blue-600 hover:text-white bg-blue-100 hover:bg-blue-600 p-2 rounded-md transition-colors duration-200"
                      title="Update details">
                      <Pencil size={20} />
                    </button>
                    <button 
                      onClick={() => handleDelete(job.id)}
                      className="text-red-600 hover:text-white bg-red-100 hover:bg-red-600 p-2 rounded-md transition-colors duration-200"
                      title="Delete job"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md mt-4 border border-blue-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-blue-800 font-medium">No jobs found. Click "Generate new Roadmap" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default JobSkillsTable;