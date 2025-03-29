import React, { useState } from 'react';
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
      // Show job role and skill 
    } else if (option === 2) {
      // Generate normal roadmap
      fetchAIResponse(option);
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
    
    // Option 1: Specific job and skill improvement
    if (option === 1) {
      return `Generate a detailed JSON roadmap for becoming a ${jobGoal} with focus on improving ${skillInput} skills.
      The response should be ONLY valid JSON data with no markdown formatting, no code blocks, no backticks.
      Format the response as a valid JSON object with the following structure:
      {
        "r_Id": 1,
        "job_name": "${jobGoal} with focus on ${skillInput}",
        "main_text": [
          {
            "main_text_id": "1.1",
            "main_text_name": "Main Category Name",
            "sub_category": [
              {
                "sub_id": "1.1.1",
                "sub_name": "Sub Category Name",
                "sub_description": "Detailed description of this skill/concept",
                "sub_steps": [
                  {
                    "steps_id": "1.1.1.1",
                    "steps_description": "Detailed step-by-step task to improve this specific skill"
                  },
                  {
                    "steps_id": "1.1.1.2", 
                    "steps_description": "Another specific action item or learning task"
                  },
                  {
                    "steps_id": "1.1.1.3",
                    "steps_description": "Additional practice or implementation task"
                  }
                ]
              }
            ]
          }
        ]
      }
      Make sure the output is valid JSON that can be parsed directly. Focus specifically on ${skillInput} skills for this ${jobGoal} role. Include at least 3 main_text categories related to ${skillInput}, each with 2-3 sub_categories, and each sub_category with 4-6 detailed step-by-step tasks that explain exactly what the user needs to do to improve in that specific skill area. These sub_steps should be practical, actionable items in a logical progression.`;
    }
    
    // Option 2: General roadmap
    else if (option === 2) {
      return `Generate a comprehensive JSON roadmap for becoming a ${jobGoal}.
      IMPORTANT: The response should be ONLY valid JSON data with no markdown formatting, no code blocks, no backticks.
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
                "sub_steps": [
                  {
                    "steps_id": "1.1.1.1",
                    "steps_description":[
                          "steps": "First point explaining what to do specifically for this sub-category",
                                   "Second point with additional action items",
                                   "Third point with more detailed guidance",
                                   "Fourth point with practical implementation tasks",
                                   "Fifth point with assessment criteria"
                    ] 
                  }
                  
                ]
              }
            ]
          }
        ]
      }
      Cover all essential skills needed for this career path. Include 5-20 main_text categories, each with 5-10 sub_categories, and each sub_category with 4-10 detailed step-by-step tasks that explain what the user needs to do. These sub_steps should be practical, actionable items in a logical progression that build on each other. Make each step specific and measurable so users know when they've completed it.`;
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
      let text = result.response.text();
      
      try {
        // Remove any markdown code blocks or backticks that might be in the response
        if (text.includes("```json")) {
          text = text.replace(/```json/g, "").replace(/```/g, "").trim();
        }
        
        // Parse the JSON
        const parsedJson = JSON.parse(text);
        
        // Ensure the job_name includes skill information if option 1 was selected
        if (option === 1 && skill) {
          if (!parsedJson.job_name.toLowerCase().includes(skill.toLowerCase())) {
            parsedJson.job_name = `${parsedJson.job_name} (${skill} focus)`;
          }
        }
        
        setRoadmapData({ jsonData: parsedJson });
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        setRoadmapData({ 
          html: <div className="p-5 border border-red-200 rounded-lg bg-red-50 text-red-700">
            <h3 className="font-bold mb-2">Error parsing response data</h3>
            <p>The AI generated an invalid JSON response. Please try again.</p>
            <pre className="mt-4 p-3 bg-gray-100 rounded text-sm overflow-x-auto">{text}</pre>
          </div>
        });
      }
    } catch (error) {
      console.error("Error fetching or parsing roadmap data:", error);
      setRoadmapData({ 
        html: <div className="p-5 border border-red-200 rounded-lg bg-red-50 text-red-700">
          <h3 className="font-bold mb-2">Something went wrong</h3>
          <p>Error: {error.message}</p>
          <p className="mt-2">Please try again later.</p>
        </div> 
      });
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

  // Create a dynamic title based on job role and skill
  const getRoadmapTitle = () => {
    if (selectedOption === 1 && skill) {
      return `${jobRole} Roadmap( ${skill} ) `;
    }
    return `${jobRole} Roadmap`;
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[75vh] text-center">
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
        <div className="w-full max-w-4xl">
          {!optionStep ? (
            <div className="flex items-center justify-center h-80">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : selectedOption === null ? (
            <div className="p-5 flex flex-col justify-center items-center min-h-[75vh] text-center">
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
            <div className="flex items-center justify-center h-80">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}
          
          {roadmapData && !isLoading && (
            <div className="mb-8">
              {roadmapData.jsonData ? (
                <Roadmap 
                  jobGoal={getRoadmapTitle()} 
                  JsonRoadmapData={roadmapData.jsonData} 
                />
              ) : (
                <div>{roadmapData.html}</div>
              )}
              <div className="mt-4 text-center">
                <button
                  onClick={resetForm}
                  className="py-2 px-5 bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchRoadmap;