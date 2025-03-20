import React, { useState } from 'react';
import RoadmapGeminiApi from './RoadmapGeminiApi';
import Roadmap from './Roadmap';

const SearchRoadmap = () => {
  const [searchInput, setSearchInput] = useState('');
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [optionStep, setOptionStep] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [skill, setSkill] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [roadmapData, setRoadmapData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = "AIzaSyDk93DVnzDnYhuJyHCLIsjMjHd47uODLvs";

  const handleInitialSubmit = () => {
    if (searchInput.trim() === '') {
      alert("Please enter your career goal!");
      return;
    }
    // Extract and save the job role from the input
    const extractedJobRole = searchInput.replace(/i want to become a/i, "").replace(/i want to become/i, "").trim();
    setJobRole(extractedJobRole);
    setOptionStep(true);
    setShowRoadmap(true);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    
    if (option === 1) {
      // Show skill input field
    } else if (option === 2) {
      // Generate general roadmap
      fetchAIResponse(option);
    } else if (option === 3) {
      // Show Google link
      setRoadmapData({
        googleLink: true,
        html: `<p>To assess your current skill level, please visit <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Google</a> to find relevant skill assessment resources.</p>`
      });
    }
  };

  const handleSkillSubmit = () => {
    if (!skill) {
      alert("Please enter the skill you want to improve!");
      return;
    }
    fetchAIResponse(selectedOption);
  };

  const createDynamicPrompt = (userInput, option, skillInput = "") => {
    const jobGoal = userInput.replace(/i want to become a/i, "").replace(/i want to become/i, "").trim();
    
    // Option 1: Specific skill improvement
    if (option === 1) {
      return `Generate a detailed JSON roadmap for becoming a ${jobGoal} with focus on improving ${skillInput} skills.
      Format the response as a valid JSON object with the following structure:
      {
        "r_Id": 1,
        "job_name": "${jobGoal}",
        "main_text": [
          {
            "main_text_id": "1.1",
            "main_text_name": "Main Category Name",
            "sub_category": [
              {
                "sub_id": "1.1.1",
                "sub_name": "Sub Category Name",
                "sub_description": "Detailed description of this skill/concept",
                "resources": [
                  {
                    "resource_id": "1.1.1.1",
                    "resource_description": "Resource description",
                    "resource_link": "https://example.com"
                  }
                ]
              }
            ]
          }
        ]
      }
      Make sure the output is valid JSON that can be parsed directly. Include at least 3 main_text categories, each with 2-3 sub_categories, and each sub_category with 2-3 resources.`;
    }
    
    // Option 2: General roadmap
    else if (option === 2) {
      return `Generate a comprehensive JSON roadmap for becoming a ${jobGoal}.
      Format the response as a valid JSON object with the following structure:
      {
        "r_Id": 1,
        "job_name": "${jobGoal}",
        "main_text": [
          {
            "main_text_id": "1.1",
            "main_text_name": "Main Category Name",
            "sub_category": [
              {
                "sub_id": "1.1.1",
                "sub_name": "Sub Category Name",
                "sub_description": "Detailed description of this skill/concept",
                "resources": [
                  {
                    "resource_id": "1.1.1.1",
                    "resource_description": "Resource description",
                    "resource_link": "https://example.com"
                  }
                ]
              }
            ]
          }
        ]
      }
      Make sure the output is valid JSON that can be parsed directly. Cover all essential skills needed for this career path. Include at least 4 main_text categories, each with 3-4 sub_categories, and each sub_category with 2-3 resources.`;
    }

    return "";
  };

  const fetchAIResponse = async (option) => {
    setIsLoading(true);
    try {
      // Import GoogleGenerativeAI dynamically to avoid server-side issues
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(API_KEY);
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const processedPrompt = createDynamicPrompt(searchInput, option, skill);
      const result = await model.generateContent(processedPrompt);
      const text = result.response.text();
      
      try {
        // Attempt to parse the JSON
        const jsonData = JSON.parse(text);
        setRoadmapData({ jsonData });
      } catch (jsonError) {
        // If JSON parsing fails, display as text
        console.error("Error parsing JSON:", jsonError);
        setRoadmapData({ html: `<pre>${text}</pre>` });
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setRoadmapData({ html: "Oops! Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setShowRoadmap(false);
    setOptionStep(false);
    setSelectedOption(null);
    setSkill("");
    setRoadmapData(null);
    setJobRole("");
  };

  return (
    <div className="flex flex-col justify-center items-center h-[62vh] text-center">
      {!showRoadmap ? (
        <div>
          <h1 className="text-2xl font-bold mb-5">GENERATE ROADMAP</h1>
          <div className="flex flex-row items-center mb-8">
            <input 
              type="text" 
              placeholder="Frontend Developer"
              className="w-96 py-2 px-4 text-base border border-gray-300 rounded-l-md focus:outline-none"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-r-md py-2 px-5 text-base cursor-pointer h-full"
              onClick={handleInitialSubmit}
            >
              Generate
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl h-full">
          {!optionStep ? (
            <div>Loading options...</div>
          ) : selectedOption === null ? (
            <div className="p-5">
              <h3 className="text-xl font-bold mb-9">Please select an option:</h3>
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => handleOptionSelect(1)}
                  className="p-4 text-left border border-gray-300 rounded-md bg-white hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  1. In which skill area do you want to improve for becoming a {jobRole}?
                </button>
                <button 
                  onClick={() => handleOptionSelect(2)}
                  className="p-4 text-left border border-gray-300 rounded-md bg-white hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  2. No idea where to start, just need a general roadmap.
                </button>
                <button 
                  onClick={() => handleOptionSelect(3)}
                  className="p-4 text-left border border-gray-300 rounded-md bg-white hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  3. I don't know my current skill levels.
                </button>
              </div>
              <button
                onClick={resetForm}
                className="mt-5 py-2 px-5 bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200"
              >
                Go Back
              </button>
            </div>
          ) : selectedOption === 1 ? (
            <div className="p-5 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-xl font-bold mb-5">Which specific skill do you want to focus on?</h3>
              <div className="mb-5">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  placeholder="Example: JavaScript, Design, Database, etc."
                  className="w-full py-2 px-4 text-base border border-gray-300 rounded-md focus:outline-none"
                />
              </div>
              
              <div className="flex gap-3 justify-between">
                <button
                  onClick={resetForm}
                  className="py-2 px-5 bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200"
                >
                  Go Back
                </button>
                <button
                  onClick={handleSkillSubmit}
                  className="py-2 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer"
                >
                  Generate Roadmap
                </button>
              </div>
            </div>
          ) : null}

          {isLoading && (
            <div className="mt-8 p-5 rounded-lg bg-white text-center">
              <p className="text-xl">Loading your roadmap...</p>
            </div>
          )}

          {roadmapData && !isLoading && (
            <RoadmapGeminiApi
              data={roadmapData} 
              jobRole={jobRole} 
              onReset={resetForm} 
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchRoadmap;