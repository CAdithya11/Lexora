import React from 'react';

const RoadmapGeminiApi = ({ data, jobRole, onReset }) => {
  // If we have raw HTML (like for option 3 or error messages)
  if (data.html) {
    return (
      <div className="mt-8 p-5 rounded-lg bg-white text-left max-h-[500px] overflow-y-auto overflow-x-hidden shadow-lg border border-blue-100">
        <h2 className="text-2xl font-bold mb-6 sticky top-0 bg-white py-3 text-blue-800 border-b border-blue-100 z-10">
          {jobRole} Roadmap
        </h2>
        <div 
          dangerouslySetInnerHTML={{ __html: data.html }} 
          className="pb-16"
        />
        <div className="mt-8 text-center sticky bottom-0 bg-white py-3 border-t border-blue-100">
          <button
            onClick={onReset}
            className="py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer shadow-md transition-colors duration-200"
          >
            Generate Another Roadmap
          </button>
        </div>
      </div>
    );
  }

  // If we have structured JSON data (for options 1 and 2)
  if (data.jsonData) {
    const roadmapData = data.jsonData;
    
    return (
      <div className="mt-8 rounded-lg bg-white text-left max-h-[500px] overflow-y-auto overflow-x-hidden shadow-lg border border-blue-100">
        {/* Main heading */}
        <h2 className="text-2xl font-bold sticky top-0 bg-white py-4 px-6 text-blue-800 border-b border-blue-100 z-10">
          {roadmapData.job_name} Roadmap
        </h2>
        
        <div className="p-6">
          {roadmapData.main_text.map((main) => (
            <div key={main.main_text_id} className="mb-10">
              {/* Main category (fundamentals, core concepts, etc.) */}
              <h3 className="text-xl font-semibold text-blue-700 mb-4 pb-2 border-b border-blue-100">
                {main.main_text_name}
              </h3>
              
              <div className="pl-4">
                {main.sub_category.map((sub) => (
                  <div key={sub.sub_id} className="mb-6 bg-blue-50 p-4 rounded-lg shadow-sm">
                    {/* Sub-category (HTML, CSS, etc.) */}
                    <h4 className="text-lg font-medium text-blue-600 mb-2">
                      {sub.sub_name}
                    </h4>
                    
                    {/* Sub-description */}
                    <p className="text-gray-700 mb-4 text-sm">
                      {sub.sub_description}
                    </p>
                    
                    <div className="mt-4 bg-white p-4 rounded-md shadow-sm border border-blue-50">
                      <h5 className="font-medium text-blue-500 mb-2 text-sm uppercase tracking-wide">
                        Resources:
                      </h5>
                      
                      <div className="space-y-3">
                        {sub.resources.map((resource) => (
                          <div key={resource.resource_id} className="pl-3 border-l-2 border-blue-200">
                            {/* Resource description */}
                            <p className="text-gray-800 font-medium mb-1">
                              {resource.resource_description}
                            </p>
                            
                            {/* Resource link */}
                            <a 
                              href={resource.resource_link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline text-sm flex items-center"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              {resource.resource_link}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="sticky bottom-0 bg-white py-3 px-6 border-t border-blue-100 text-center">
          <button
            onClick={onReset}
            className="py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer shadow-md transition-colors duration-200"
          >
            Generate Another Roadmap
          </button>
        </div>
      </div>
    );
  }
  
  return null;
};

export default RoadmapGeminiApi;