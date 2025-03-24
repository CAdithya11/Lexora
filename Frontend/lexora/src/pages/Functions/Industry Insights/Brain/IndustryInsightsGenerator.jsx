import React, { useState } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

export default function IndustryInsightsGenerator() {
  const [IndustryInsightsData, setIndustryInsightsData] = useState();
  const [userInput, setUsetInput] = useState();

  const apiKey = 'AIzaSyAsEXgq2Hpi8HYS56VmQYQorDkf-YdBqgc';
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction:
      'GIve thise month best 10 trending IT Jobs and how much trending it is as an count. When the country given by the user, as the response give an Json',
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
  };

  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: 'user',
          parts: [{ text: 'USA' }],
        },
        {
          role: 'model',
          parts: [
            {
              text: 'Okay, here\'s a JSON structure providing the top 10 trending IT jobs in the USA, along with a trend count (this is a simplified, illustrative number, not a real-time calculation):\n\n```json\n{\n  "country": "USA",\n  "reportDate": "2024-02-29",\n  "trendingITJobs": [\n    {\n      "jobTitle": "Data Scientist",\n      "trendCount": 95\n    },\n    {\n      "jobTitle": "Cloud Architect",\n      "trendCount": 92\n    },\n    {\n      "jobTitle": "Cybersecurity Analyst",\n      "trendCount": 88\n    },\n    {\n      "jobTitle": "Software Engineer",\n      "trendCount": 85\n    },\n    {\n      "jobTitle": "DevOps Engineer",\n      "trendCount": 82\n    },\n    {\n      "jobTitle": "Machine Learning Engineer",\n      "trendCount": 78\n    },\n    {\n      "jobTitle": "Network Engineer",\n      "trendCount": 75\n    },\n    {\n      "jobTitle": "Database Administrator",\n      "trendCount": 70\n    },\n    {\n      "jobTitle": "IT Support Specialist",\n      "trendCount": 65\n    },\n    {\n      "jobTitle": "Business Intelligence Analyst",\n      "trendCount": 62\n    }\n  ],\n  "disclaimer": "Trend counts are illustrative and do not represent real-time job market data.  Refer to reputable job boards and market research for accurate information."\n}\n```\n\n**Explanation of the fields:**\n\n*   `country`: The country the data applies to.\n*   `reportDate`:  A static date for when this information was compiled.\n*   `trendingITJobs`: An array of job objects.\n    *   `jobTitle`: The name of the IT job.\n    *   `trendCount`:  A relative number indicating how much the job is trending compared to others in the list. *Higher number means more trending.*  This is NOT a real-time or precise calculation. It\'s meant to give a sense of relative popularity based on general observations about the current market.\n*   `disclaimer`:  A crucial disclaimer stating the limitations of the `trendCount` data and recommending consulting more reliable sources.\n\n**Important Considerations and Disclaimer (READ CAREFULLY):**\n\n1.  **The `trendCount` numbers are *not real-time* or derived from any specific job board API.** They are simplified, relative indicators based on common knowledge and observations of the IT job market. They are intended for *illustrative purposes only*.\n\n2.  **Real Job Market Data is Dynamic:** The IT job market changes rapidly. What\'s trending today might be different tomorrow.\n\n3.  **To get accurate, up-to-date data, you MUST use the following resources:**\n\n    *   **Reputable Job Boards:** Indeed, LinkedIn Jobs, Glassdoor, Monster, Dice, etc.\n    *   **Market Research Reports:**  Gartner, Forrester, IDC, Burning Glass, etc. (These often come at a cost).\n    *   **Industry News:** Stay informed about technology trends and company announcements.\n    *   **Salary Surveys:**  Robert Half, Payscale, etc.\n\n4.  **Location Matters:** Trends can vary *within* the USA (e.g., Silicon Valley vs. the Midwest).\n\n5.  **Skills are Key:** Focus on in-demand *skills* (e.g., Python, AWS, Azure, Kubernetes, React, Cybersecurity frameworks) rather than *just* job titles. Job titles can be misleading.\n\n6.  **Data Science vs. Machine Learning:** The distinction between "Data Scientist" and "Machine Learning Engineer" can be blurry.  They often require overlapping skills.\n\nThis JSON provides a *general idea* of what\'s hot, but *always verify* with real-time data from reliable sources. Good luck with your job search!\n',
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(userInput);
    setIndustryInsightsData(result.response.text());
  }

  function findData(e) {
    e.preventDefault();
    run();
  }

  return (
    <>
      <form className="max-w-sm mx-auto" onSubmit={(e) => findData(e)}>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input
            type="text"
            id="input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
            value={userInput}
            onChange={(e) => setUsetInput(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>

      <p className="mb-3 text-gray-500 dark:text-gray-400">{IndustryInsightsData}</p>
    </>
  );
}
