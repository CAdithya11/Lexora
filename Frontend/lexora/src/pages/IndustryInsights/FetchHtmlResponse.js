import React, { useState, useEffect } from 'react';

const FetchJobData = () => {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = '/jobs/search?cat=2&loc=86384&p=3'; // The Adzuna URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'text/html',
          },
        });

        if (response.ok) {
          const text = await response.text();
          console.log(text);

          // Parse the HTML
          const parser = new DOMParser();
          const doc = parser.parseFromString(text, 'text/html');

          // Extract job title, location, and salary
          const jobs = doc.querySelectorAll('.w-full a');
          const locations = doc.querySelectorAll('.w-full .ui-location');
          const salaries = doc.querySelectorAll('.w-full .ui-salary');

          const extractedData = Array.from(jobs).map((job, index) => ({
            job: job.innerText.trim(),
            location: locations[index]?.innerText.trim() || 'N/A',
            salary: salaries[index]?.innerText.trim() || 'N/A',
          }));

          setJobData(extractedData);
        } else {
          throw new Error('Failed to fetch the HTML');
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
              jobData.map((item, index) => (
                <li key={index}>
                  <strong>Job:</strong> {item.job} | <strong>Location:</strong> {item.location} | <strong>Salary:</strong> {item.salary}
                </li>
              ))
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
