import React, { useState, useEffect } from 'react';
import { ChevronDown, Check, ExternalLink } from 'lucide-react';

const Roadmap = ({ jobGoal = "React Developer Roadmap", JsonRoadmapData }) => {
  // Use the passed JsonRoadmapData instead of hardcoded data
  const roadmapData = JsonRoadmapData || {
    // Fallback empty structure if no data is passed
    "r_Id": 1,
    "job_name": "Default Job",
    "main_text": []
  };

  // Track completion of main nodes, categories, and resources
  const [completedItems, setCompletedItems] = useState({
    mainNodes: [],
    subCategories: [],
    resources: []
  });

  // Calculate overall progress
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(null);

  // Scroll position state
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    calculateProgress();
    
    // Add scroll event listener
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      setShowScrollTop(position > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [completedItems]);

  const calculateProgress = () => {
    let totalSubCategories = 0;
    let completedSubCategories = completedItems.subCategories.length;

    roadmapData.main_text?.forEach(mainText => {
      mainText.sub_category?.forEach(subCategory => {
        totalSubCategories++;
      });
    });

    const totalProgress = (completedSubCategories / totalSubCategories) * 100;
    setProgress(Math.round(totalProgress) || 0);
  };

  const handleMainNodeClick = (id) => {
    setCompletedItems(prev => {
      if (prev.mainNodes.includes(id)) {
        // If unchecking a main node, also uncheck all its subcategories
        const mainNode = roadmapData.main_text.find(item => item.main_text_id === id);
        const subCategoriesToRemove = mainNode.sub_category.map(subCat => subCat.sub_id);
        
        return {
          mainNodes: prev.mainNodes.filter(item => item !== id),
          subCategories: prev.subCategories.filter(item => !subCategoriesToRemove.includes(item)),
          resources: prev.resources
        };
      } else {
        // If checking a main node, add all its subcategories
        const mainNode = roadmapData.main_text.find(item => item.main_text_id === id);
        const subCategoriesToAdd = mainNode.sub_category.map(subCat => subCat.sub_id);
        
        return {
          mainNodes: [...prev.mainNodes, id],
          subCategories: [...new Set([...prev.subCategories, ...subCategoriesToAdd])],
          resources: prev.resources
        };
      }
    });
  };

  const handleSubCategoryClick = (id, mainNodeId) => {
    setCompletedItems(prev => {
      if (prev.subCategories.includes(id)) {
        // If unchecking a subcategory
        return {
          ...prev,
          subCategories: prev.subCategories.filter(item => item !== id)
        };
      } else {
        // If checking a subcategory
        // Ensure main node is also checked
        let newMainNodes = [...prev.mainNodes];
        if (!newMainNodes.includes(mainNodeId)) {
          newMainNodes.push(mainNodeId);
        }

        return {
          mainNodes: newMainNodes,
          subCategories: [...prev.subCategories, id],
          resources: prev.resources
        };
      }
    });
  };

  // Check if all subcategories in a main node are completed
  const areAllSubCategoriesCompleted = (mainNodeId) => {
    const mainNode = roadmapData.main_text.find(item => item.main_text_id === mainNodeId);
    return mainNode.sub_category.every(subCat => completedItems.subCategories.includes(subCat.sub_id));
  };

  // Toggle section expansion
  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  // Get the count of completed subcategories by main node
  const getCompletedCountByMainNode = (mainNodeId) => {
    const mainNode = roadmapData.main_text.find(item => item.main_text_id === mainNodeId);
    if (!mainNode) return { completed: 0, total: 0 };

    let totalSubCategories = mainNode.sub_category.length;
    let completedSubCategories = mainNode.sub_category.filter(
      subCat => completedItems.subCategories.includes(subCat.sub_id)
    ).length;

    return {
      completed: completedSubCategories,
      total: totalSubCategories,
      percentage: Math.round((completedSubCategories / totalSubCategories) * 100) || 0
    };
  };

  return (
    <div className="bg-white w-full max-w-6xl mx-auto rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header & Progress Section (fixed at top when scrolling) */}
      <div className={`p-6 border-b border-gray-100 bg-white ${scrollPosition > 100 ? 'sticky top-0 z-10 shadow-md' : ''}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{jobGoal || roadmapData.job_name}</h1>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-4 mb-2">
          <div 
            className="bg-blue-500 h-full rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Your progress</span>
          <span className="font-medium">{progress}% complete</span>
        </div>
      </div>

      {/* Main Content with Improved Scrolling */}
      <div className="relative max-h-[70vh] overflow-y-auto px-6 pt-6 pb-16" style={{ scrollbarWidth: 'thin' }}>
        {/* Main Timeline Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        {/* Timeline Sections */}
        <ul className="relative space-y-6">
          {roadmapData.main_text && roadmapData.main_text.map((mainItem, index) => {
            const isCompleted = completedItems.mainNodes.includes(mainItem.main_text_id);
            const isExpanded = expanded === mainItem.main_text_id;
            const isLastItem = index === roadmapData.main_text.length - 1;
            const mainNodeStats = getCompletedCountByMainNode(mainItem.main_text_id);

            return (
              <li 
                key={mainItem.main_text_id} 
                className="relative pl-10" 
                id={`section-${mainItem.main_text_id}`}
              >
                {/* Main Node Circle */}
                <div className="absolute left-4 top-2 transform -translate-x-1/2">
                  <button
                    className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${
                      isCompleted ? 'bg-blue-500 text-white shadow-sm' : 'border-2 border-gray-300 bg-white'
                    }`}
                    onClick={() => handleMainNodeClick(mainItem.main_text_id)}
                  >
                    {isCompleted ? 
                      <Check size={16} /> : 
                      <span className="text-gray-500 font-medium">{index + 1}</span>
                    }
                  </button>
                </div>

                {/* Main Section Card */}
                <div className="rounded-lg border border-gray-200 overflow-hidden bg-white transition-shadow hover:shadow-md">
                  {/* Header */}
                  <div
                    className="px-4 py-3 flex items-center justify-between cursor-pointer bg-gray-50"
                    onClick={() => toggleExpand(mainItem.main_text_id)}
                  >
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{mainItem.main_text_name}</h2>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Progress Stats */}
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {mainNodeStats.completed}/{mainNodeStats.total}
                        </div>
                        <div className="text-xs text-gray-500">Steps completed</div>
                      </div>

                      {/* Expand/Collapse Icon */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      >
                        <ChevronDown size={18} className="text-gray-500" />
                      </div>
                    </div>
                  </div>

                  {/* Expandable Content - No Inner Scrollbar */}
                  <div
                    className={`transition-all duration-300 ${
                      isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                  >
                    <div className="p-4 border-t border-gray-100">
                      {/* Sub Categories */}
                      <div className="space-y-4">
                        {mainItem.sub_category && mainItem.sub_category.map((subCategory) => {
                          const isSubCompleted = completedItems.subCategories.includes(subCategory.sub_id);

                          return (
                            <div key={subCategory.sub_id} className="border border-gray-200 rounded-md overflow-hidden">
                              {/* Sub Category Header */}
                              <div
                                className={`px-4 py-3 flex items-center gap-3 cursor-pointer bg-gray-50 border-b border-gray-200 ${
                                  isSubCompleted ? 'bg-blue-50' : ''
                                }`}
                                onClick={() => handleSubCategoryClick(subCategory.sub_id, mainItem.main_text_id)}
                              >
                                {/* Checkbox for sub category */}
                                <div
                                  className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center ${
                                    isSubCompleted
                                      ? 'bg-blue-500 text-white'
                                      : 'border border-gray-300 bg-white'
                                  }`}
                                >
                                  {isSubCompleted && <Check size={14} className="text-white" />}
                                </div>

                                <div>
                                  <h3 className="text-base font-medium">{subCategory.sub_name}</h3>
                                </div>
                              </div>

                              {/* Sub Category Content */}
                              <div className="p-4 bg-white">
                                <p className="text-sm text-gray-700 mb-4">{subCategory.sub_description}</p>
                                
                                {subCategory.resources && subCategory.resources.length > 0 && (
                                  <div>
                                    <p className="font-medium text-sm mb-2">Resources:</p>
                                    <ul className="space-y-2">
                                      {subCategory.resources.map((resource) => (
                                        <li key={resource.resource_id} className="flex gap-2 items-start text-sm">
                                          <ExternalLink size={14} className="mt-0.5 text-blue-500 flex-shrink-0" />
                                          <div>
                                            <p>{resource.resource_description}</p>
                                            {resource.resource_link && (
                                              <a 
                                                href={resource.resource_link} 
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline inline-flex items-center gap-1"
                                              >
                                                {resource.resource_link.replace(/^https?:\/\//, '').split('/')[0]}
                                              </a>
                                            )}
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-10 h-10 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Roadmap;