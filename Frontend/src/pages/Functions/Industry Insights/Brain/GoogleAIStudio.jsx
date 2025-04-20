import { useState } from 'react';

const GoogleAIStudio = () => {
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = 'AIzaSyDk93DVnzDnYhuJyHCLIsjMjHd47uODLvs';

  const createJobDataPrompt = (year, country, jobCategory) => {
    return `Generate realistic IT job market data for the year ${year} in ${country.name}. 
    Focus on the ${jobCategory} category.
    
    Format the response as a pure JSON array of objects WITHOUT any markdown formatting, code blocks, or backticks. The output should be directly parseable by JSON.parse(). Each object should have the following structure:
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
    
    Include different IT job roles across these categories:
    - Software Development & Engineering (roles like Software Engineer, Full-Stack Developer, Mobile App Developer, etc.)
    - Data Science & Analytics (Data Scientist, Data Engineer, Business Intelligence Analyst, etc.)
    - Cybersecurity (Security Analyst, Penetration Tester, Security Engineer, etc.)
    - Cloud Computing (Cloud Architect, DevOps Engineer, Site Reliability Engineer, etc.)
    - IT Support & Infrastructure (System Administrator, Network Engineer, IT Support Specialist, etc.)
    - AI & Machine Learning (ML Engineer, AI Researcher, Computer Vision Engineer, etc.)
    - Blockchain & Web3 (Blockchain Developer, Smart Contract Engineer, etc.)
    - There Shouldn't be any duplicated JobRole Data
    
    IMPORTANT: Return ONLY the valid JSON array with NO additional text, formatting, or code blocks. The response should start with "[" and end with "]".`;
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
        let cleanedText = text;

        cleanedText = cleanedText.replace(/```json|```/g, '');

        cleanedText = cleanedText.trim();

        const parsedData = JSON.parse(cleanedText);

        return {
          success: true,
          data: parsedData,
        };
      } catch (jsonError) {
        console.error('Error parsing JSON response:', jsonError);
        console.error('Raw response:', text);

        return {
          success: false,
          error: 'Failed to parse the API response',
          rawResponse: text,
        };
      }
    } catch (error) {
      console.error('Error fetching job data:', error);

      return {
        success: false,
        error: 'Failed to connect to the API',
        details: error.message,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchJobData, isLoading };
};

export default GoogleAIStudio;
