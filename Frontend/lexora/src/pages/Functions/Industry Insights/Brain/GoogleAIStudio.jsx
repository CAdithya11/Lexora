import { useState } from 'react';

const GoogleAIStudio = () => {
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = 'AIzaSyDk93DVnzDnYhuJyHCLIsjMjHd47uODLvs';

  const createJobDataPrompt = (year, country, jobCategory) => {
    return `Generate realistic IT job market data for the year ${year} in ${country.name}. 
    Focus on the ${jobCategory} category.
    Format the response as a valid JSON array of objects, each with the following structure:
    {
      "year": "${year}",
      "role": "Main Job Title",
      "subRole": "Specific Job Title",
      "jobRole": "Specific Job Function",
      "count": number of available jobs,
      "growthRate": year-over-year percentage growth rate,
      "avgSalary": average annual salary in USD,
      "minSalary": minimum typical salary in USD,
      "maxSalary": maximum typical salary in USD
    }
    
    Include at least 15 different IT job roles across these categories:
    - Software Development & Engineering (roles like Software Engineer, Full-Stack Developer, Mobile App Developer, etc.)
    - Data Science & Analytics (Data Scientist, Data Engineer, Business Intelligence Analyst, etc.)
    - Cybersecurity (Security Analyst, Penetration Tester, Security Engineer, etc.)
    - Cloud Computing (Cloud Architect, DevOps Engineer, Site Reliability Engineer, etc.)
    - IT Support & Infrastructure (System Administrator, Network Engineer, IT Support Specialist, etc.)
    - AI & Machine Learning (ML Engineer, AI Researcher, Computer Vision Engineer, etc.)
    - Blockchain & Web3 (Blockchain Developer, Smart Contract Engineer, etc.)
    
    Make sure the output is valid JSON that can be parsed directly. Use realistic salary ranges and growth rates based on industry trends.`;
  };

  const fetchJobData = async (year, country, jobCategory) => {
    setIsLoading(true);
    try {
      // Import GoogleGenerativeAI dynamically to avoid server-side issues
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(API_KEY);

      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = createJobDataPrompt(year, country, jobCategory);
      const result = await model.generateContent(prompt);
      const text = result.response.text();

      try {
        // Attempt to parse the JSON
        const parsedData = JSON.parse(text);
        return {
          success: true,
          data: parsedData,
        };
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
        return {
          success: false,
          error: 'Failed to parse the API response',
        };
      }
    } catch (error) {
      console.error('Error fetching job data:', error);
      return {
        success: false,
        error: 'Failed to connect to the API',
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchJobData, isLoading };
};

export default GoogleAIStudio;
