import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const RoadmapGeminiApi = () => {
  const [response, setResponse] = useState("");
  const [prompt, setPrompt] = useState("");

  const API_KEY = "AIzaSyDk93DVnzDnYhuJyHCLIsjMjHd47uODLvs";
  const genAI = new GoogleGenerativeAI(API_KEY);

  const createDynamicPrompt = (userInput) => {
    const specificQuery = "I want to become a frontend developer with react";
    
    if (userInput.toLowerCase() === specificQuery.toLowerCase()) {
      return `Generate a detailed roadmap for becoming a frontend developer with React. 
        Divide the roadmap into two main branches (e.g., Fundamentals and Advanced Concepts). 
        Include timelines, key topics, resources, and project suggestions for each branch. 
        Make sure each step is explained in depth.`;
    }

    if (!userInput.toLowerCase().includes("with") && !userInput.toLowerCase().match(/\b(react|angular|vue|svelte|next\.js)\b/i)) {
      return `The user wants to become a developer but didn't specify a technology. 
        Respond with: 
        "Please choose an option:
        1. Not sure? Visit https://www.yorrrutube.com to assess your skill level
        2. Which specific technology do you want to focus on?"`;
    }

    return `Generate a detailed roadmap for: ${userInput}. 
      Include learning resources, practice projects, timeline estimates, 
      and interview preparation tips. Break down into monthly milestones.`;
  };

  const fetchAIResponse = async () => {
    if (!prompt) {
      alert("Please enter your career goal!");
      return;
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const processedPrompt = createDynamicPrompt(prompt);
      const result = await model.generateContent(processedPrompt);
      const text = result.response.text();
      setResponse(text.replace(/\n/g, "<br />")); // Handle line breaks for HTML
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("Oops! Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Career Roadmap Generator</h2>
      
      <div className="mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: I want to become a frontend developer with React"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <button
        onClick={fetchAIResponse}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
      >
        Generate Roadmap
      </button>

      {response && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Your Career Roadmap:</h3>
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: response }} 
          />
        </div>
      )}
    </div>
  );
};

export default RoadmapGeminiApi;