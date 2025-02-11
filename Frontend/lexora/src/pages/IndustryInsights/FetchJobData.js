import React, { useState, useEffect } from 'react';

const FetchJobData = () => {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = 'https://www.adzuna.co.uk/jobs/search?cat=2&loc=86384&p=2'; // Your target URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/scrape?url=${encodeURIComponent(url)}`);

        if (response.ok) {
          const data = await response.json();
          setJobData(data.jobData);
        } else {
          throw new Error('Failed to fetch job data');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div>
          <h3>Extracted Job Data:</h3>
          <ul>
            {jobData.length > 0 ? (
              jobData.map((job, index) => <li key={index}>{job}</li>)
            ) : (
              <p>No job data found.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FetchJobData;

