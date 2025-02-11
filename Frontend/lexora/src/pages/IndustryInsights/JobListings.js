import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../pages/IndustryInsights/Card';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Your fetch logic...
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>LinkedIn Job Listings</CardTitle>
      </CardHeader>
      <CardContent>
        <button
          onClick={fetchJobs}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search Jobs'}
        </button>

        {error && (
          <div className="text-red-600 mb-4">
            Error: {error}
          </div>
        )}

        <div className="space-y-4">
          {jobs.map(job => (
            <div key={job.id} className="p-4 border rounded">
              <h3 className="font-bold">{job.title}</h3>
              <p className="text-gray-600">{job.companyName}</p>
              <p className="text-sm">{job.location}</p>
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobListings;