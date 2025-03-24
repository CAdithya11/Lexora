import React from 'react';
import Roadmap from './Roadmap';

const RoadmapGeminiApi = ({ data, jobRole, onReset }) => {
  // If we have raw HTML (like for option 3 or error messages)
  
  
  return <Roadmap JsonRoadmapData={data.html}/>;
};

export default RoadmapGeminiApi;