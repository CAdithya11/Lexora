import React from 'react';
import Roadmap from './Roadmap';

const RoadmapGeminiApi = ({ data, jobRole, onReset }) => {
  
  return <Roadmap JsonRoadmapData={data.html}/>;
};

export default RoadmapGeminiApi;