import { useState, useEffect } from "react";

const API_URL = "https://api.apijobs.dev/v1/job/search";
const API_KEY = "3cbd7d010bf4a3105b10c4d8cd890e22642a6c48f57935c0383aeb76274359c5"; // Replace with your actual API key

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const requestBody = {
                    q: "fullstack",
                    employment_type: "full-time" // Ensure the correct format
                };

                console.log("Sending request:", JSON.stringify(requestBody)); // Debugging

                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "apiKey": API_KEY,  // Correct header key according to your setup
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(requestBody)
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch jobs");
                }

                setJobs(data.jobs || []);
            } catch (error) {
                console.error("Error fetching jobs:", error);
                setError(error.message);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div>
            <h1>Job Listings</h1>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            <ul>
                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <li key={job.id}>
                            <strong>{job.title}</strong> - {job.company}
                        </li>
                    ))
                ) : (
                    <p>No jobs found</p>
                )}
            </ul>
        </div>
    );
};

export default JobList;
