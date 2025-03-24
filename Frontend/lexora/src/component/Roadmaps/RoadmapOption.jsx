import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RoadmapOption = () => {
  const [searchInput, setSearchInput] = useState('');
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [optionStep, setOptionStep] = useState(true); // Change to true to show options initially
  const [selectedOption, setSelectedOption] = useState(null);
  const [skill, setSkill] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);

    // Direct action for option 2 and 3
    if (option === 2) {
      fetchAIResponse(option);
    } else if (option === 3) {
      navigate('/roadmap', {
        state: {
          googleLink: true,
          content: 'https://www.google.com'
        }
      });
    }
  };

  const handleSkillSubmit = () => {
    if (!skill) {
      alert('Please enter a skill');
      return;
    }

    fetchAIResponse(1, skill);
  };

  const fetchAIResponse = (option, skillInput = "") => {
    setIsLoading(true);
    let dynamicPrompt = createDynamicPrompt(jobRole, option, skillInput);

    // Navigate to Roadmap page with the prompt and data
    navigate('/roadmap', {
      state: {
        prompt: dynamicPrompt,
        jobRole: jobRole,
        skill: skillInput,
        option: option,
      }
    });
  };

  const createDynamicPrompt = (userInput, option, skillInput = "") => {
    const jobGoal = userInput.replace(/i want to become a/i, "").replace(/i want to become/i, "").trim();

    if (option === 1) {
      return `Generate a roadmap for becoming a ${jobGoal} with a focus on improving ${skillInput} skills.`;
    } else if (option === 2) {
      return `Generate a general comprehensive roadmap for becoming a ${jobGoal}.`;
    }
    return "";
  };

  const resetForm = () => {
    setShowRoadmap(false);
    setOptionStep(true);
    setSelectedOption(null);
    setSkill("");
    setJobRole("");
  };

  return (
    <div className="flex flex-col justify-center items-center h-[62vh] text-center">
      {!showRoadmap ? (
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
        </div>
      ) : null}
    </div>
  );
};

export default RoadmapOption;
