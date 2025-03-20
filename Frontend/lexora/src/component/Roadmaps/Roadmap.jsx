import React, { useState, useEffect } from 'react';
import { ChevronDown, Check, ExternalLink } from 'lucide-react';

const Roadmap = ({ jobGoal = "React Developer Roadmap" }) => {
  // Sample data structure following the provided format
  const roadmapData = {
    "r_Id": 1,
    "job_name": jobGoal,
    "main_text": [
      {
        "main_text_id": "1",
        "main_text_name": "Fundamentals",
        "sub_category": [
          {
            "sub_id": "1.1",
            "sub_name": "HTML",
            "sub_description": "Essential markup language for web development",
            "resources": [
              {
                "resource_id": "1.1.1",
                "resource_description": "Semantic Markup",
                "resource_link": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element"
              },
              {
                "resource_id": "1.1.2",
                "resource_description": "Forms & Validation",
                "resource_link": "https://developer.mozilla.org/en-US/docs/Learn/Forms"
              },
              {
                "resource_id": "1.1.3",
                "resource_description": "Accessibility",
                "resource_link": "https://web.dev/learn/accessibility"
              }
            ]
          },
          {
            "sub_id": "1.2",
            "sub_name": "CSS",
            "sub_description": "Styling language for web applications",
            "resources": [
              {
                "resource_id": "1.2.1",
                "resource_description": "Box Model",
                "resource_link": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model"
              },
              {
                "resource_id": "1.2.2",
                "resource_description": "Flexbox",
                "resource_link": "https://css-tricks.com/snippets/css/a-guide-to-flexbox/"
              },
              {
                "resource_id": "1.2.3",
                "resource_description": "Grid",
                "resource_link": "https://css-tricks.com/snippets/css/complete-guide-grid/"
              }
            ]
          }
        ]
      },
      {
        "main_text_id": "2",
        "main_text_name": "React Core",
        "sub_category": [
          {
            "sub_id": "2.1",
            "sub_name": "React Fundamentals",
            "sub_description": "Core concepts for building React applications",
            "resources": [
              {
                "resource_id": "2.1.1",
                "resource_description": "JSX",
                "resource_link": "https://react.dev/learn/writing-markup-with-jsx"
              },
              {
                "resource_id": "2.1.2",
                "resource_description": "Component Architecture",
                "resource_link": "https://react.dev/learn/your-first-component"
              }
            ]
          },
          {
            "sub_id": "2.2",
            "sub_name": "Hooks",
            "sub_description": "Modern React state and lifecycle management",
            "resources": [
              {
                "resource_id": "2.2.1",
                "resource_description": "useState",
                "resource_link": "https://react.dev/reference/react/useState"
              },
              {
                "resource_id": "2.2.2",
                "resource_description": "useEffect",
                "resource_link": "https://react.dev/reference/react/useEffect"
              }
            ]
          }
        ]
      }
    ]
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
    let totalResources = 0;
    let completedResources = completedItems.resources.length;

    roadmapData.main_text.forEach(mainText => {
      mainText.sub_category.forEach(subCategory => {
        totalResources += subCategory.resources.length;
      });
    });

    const totalProgress = (completedResources / totalResources) * 100;
    setProgress(Math.round(totalProgress) || 0);
  };

  const handleMainNodeClick = (id) => {
    setCompletedItems(prev => {
      if (prev.mainNodes.includes(id)) {
        // If unchecking a main node, also uncheck all its subcategories and resources
        const mainNode = roadmapData.main_text.find(item => item.main_text_id === id);
        const subCategoriesToRemove = mainNode.sub_category.map(subCat => subCat.sub_id);
        const resourcesToRemove = [];
        
        mainNode.sub_category.forEach(subCat => {
          subCat.resources.forEach(resource => {
            resourcesToRemove.push(resource.resource_id);
          });
        });

        return {
          mainNodes: prev.mainNodes.filter(item => item !== id),
          subCategories: prev.subCategories.filter(item => !subCategoriesToRemove.includes(item)),
          resources: prev.resources.filter(item => !resourcesToRemove.includes(item))
        };
      } else {
        // If checking a main node, add all its subcategories and resources
        const mainNode = roadmapData.main_text.find(item => item.main_text_id === id);
        const subCategoriesToAdd = mainNode.sub_category.map(subCat => subCat.sub_id);
        const resourcesToAdd = [];
        
        mainNode.sub_category.forEach(subCat => {
          subCat.resources.forEach(resource => {
            resourcesToAdd.push(resource.resource_id);
          });
        });

        return {
          mainNodes: [...prev.mainNodes, id],
          subCategories: [...new Set([...prev.subCategories, ...subCategoriesToAdd])],
          resources: [...new Set([...prev.resources, ...resourcesToAdd])]
        };
      }
    });
  };

  const handleSubCategoryClick = (id, mainNodeId) => {
    setCompletedItems(prev => {
      if (prev.subCategories.includes(id)) {
        // If unchecking a subcategory, also uncheck all its resources
        const mainNode = roadmapData.main_text.find(item => item.main_text_id === mainNodeId);
        const subCategory = mainNode.sub_category.find(subCat => subCat.sub_id === id);
        const resourcesToRemove = subCategory.resources.map(resource => resource.resource_id);

        return {
          ...prev,
          subCategories: prev.subCategories.filter(item => item !== id),
          resources: prev.resources.filter(item => !resourcesToRemove.includes(item))
        };
      } else {
        // If checking a subcategory, add all its resources
        const mainNode = roadmapData.main_text.find(item => item.main_text_id === mainNodeId);
        const subCategory = mainNode.sub_category.find(subCat => subCat.sub_id === id);
        const resourcesToAdd = subCategory.resources.map(resource => resource.resource_id);

        // Ensure main node is also checked
        let newMainNodes = [...prev.mainNodes];
        if (!newMainNodes.includes(mainNodeId)) {
          newMainNodes.push(mainNodeId);
        }

        return {
          mainNodes: newMainNodes,
          subCategories: [...prev.subCategories, id],
          resources: [...new Set([...prev.resources, ...resourcesToAdd])]
        };
      }
    });
  };

  const handleResourceClick = (id, subCategoryId, mainNodeId) => {
    setCompletedItems(prev => {
      if (prev.resources.includes(id)) {
        // If unchecking a resource
        return {
          ...prev,
          resources: prev.resources.filter(item => item !== id)
        };
      } else {
        // If checking a resource, ensure the subcategory and main node are also checked
        let newMainNodes = [...prev.mainNodes];
        let newSubCategories = [...prev.subCategories];

        if (!newMainNodes.includes(mainNodeId)) {
          newMainNodes.push(mainNodeId);
        }

        if (!newSubCategories.includes(subCategoryId)) {
          newSubCategories.push(subCategoryId);
        }

        return {
          mainNodes: newMainNodes,
          subCategories: newSubCategories,
          resources: [...prev.resources, id]
        };
      }
    });
  };

  // Check if all resources in a subcategory are completed
  const areAllResourcesCompleted = (subCategoryId, mainNodeId) => {
    const mainNode = roadmapData.main_text.find(item => item.main_text_id === mainNodeId);
    const subCategory = mainNode.sub_category.find(subCat => subCat.sub_id === subCategoryId);
    return subCategory.resources.every(resource => completedItems.resources.includes(resource.resource_id));
  };

  // Check if any resources in a subcategory are completed
  const isAnyResourceCompleted = (subCategoryId, mainNodeId) => {
    const mainNode = roadmapData.main_text.find(item => item.main_text_id === mainNodeId);
    const subCategory = mainNode.sub_category.find(subCat => subCat.sub_id === subCategoryId);
    return subCategory.resources.some(resource => completedItems.resources.includes(resource.resource_id));
  };

  // Check if all subcategories in a main node are completed
  const areAllSubCategoriesCompleted = (mainNodeId) => {
    const mainNode = roadmapData.main_text.find(item => item.main_text_id === mainNodeId);
    return mainNode.sub_category.every(subCat => completedItems.subCategories.includes(subCat.sub_id));
  };

  // Get subcategory completion status (0 = none, 1 = partial, 2 = complete)
  const getSubCategoryCompletionStatus = (subCategoryId, mainNodeId) => {
    if (areAllResourcesCompleted(subCategoryId, mainNodeId)) return 2;
    if (isAnyResourceCompleted(subCategoryId, mainNodeId)) return 1;
    return 0;
  };

  // Toggle section expansion
  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  // Get the count of completed resources by main node
  const getCompletedCountByMainNode = (mainNodeId) => {
    const mainNode = roadmapData.main_text.find(item => item.main_text_id === mainNodeId);
    if (!mainNode) return { completed: 0, total: 0 };

    let totalResources = 0;
    let completedResources = 0;

    mainNode.sub_category.forEach(subCategory => {
      subCategory.resources.forEach(resource => {
        totalResources++;
        if (completedItems.resources.includes(resource.resource_id)) {
          completedResources++;
        }
      });
    });

    return {
      completed: completedResources,
      total: totalResources,
      percentage: Math.round((completedResources / totalResources) * 100) || 0
    };
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Scroll to section function
  const scrollToSection = (id) => {
    const element = document.getElementById(`section-${id}`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="bg-white w-full max-w-6xl mx-auto rounded-lg shadow-sm border border-gray-200">
      {/* Header & Progress Section (fixed at top when scrolling) */}
      <div className={`p-6 border-b border-gray-100 bg-white ${scrollPosition > 100 ? 'sticky top-0 z-10 shadow-md' : ''}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{jobGoal}</h1>
          
          {/* Scroll to sections dropdown - only visible when scrolling */}
          {scrollPosition > 100 && (
            <div className="relative group">
              <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md flex items-center gap-2 text-sm hover:bg-blue-100">
                Jump to section <ChevronDown size={16} />
              </button>
              <div className="absolute right-0 mt-1 bg-white shadow-lg rounded-md border border-gray-200 w-56 hidden group-hover:block z-20">
                <ul className="py-1">
                  {roadmapData.main_text.map((item) => (
                    <li key={item.main_text_id}>
                      <button 
                        onClick={() => scrollToSection(item.main_text_id)}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 w-full text-left flex items-center justify-between"
                      >
                        {item.main_text_name}
                        <span className="text-xs text-gray-500">
                          {getCompletedCountByMainNode(item.main_text_id).completed}/{getCompletedCountByMainNode(item.main_text_id).total}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
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

      {/* Timeline Container with overflow scroll for long content */}
      <div className="p-6 max-h-screen overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
        <div className="relative">
          {/* Main Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          {/* Timeline Sections */}
          <ul className="relative space-y-6">
            {roadmapData.main_text.map((mainItem, index) => {
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
                          <div className="text-xs text-gray-500">Resources completed</div>
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

                    {/* Expandable Content with internal scroll for very long sub-sections */}
                    <div
                      className={`transition-all duration-300 overflow-hidden ${
                        isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-4 border-t border-gray-100 max-h-96 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                        {/* Sub Categories */}
                        <div className="space-y-4">
                          {mainItem.sub_category.map((subCategory) => {
                            const subCategoryStatus = getSubCategoryCompletionStatus(
                              subCategory.sub_id, 
                              mainItem.main_text_id
                            );
                            const completedResourceCount = subCategory.resources.filter(
                              resource => completedItems.resources.includes(resource.resource_id)
                            ).length;

                            return (
                              <div key={subCategory.sub_id} className="border border-gray-200 rounded-md overflow-hidden">
                                {/* Sub Category Header */}
                                <div
                                  className="px-4 py-3 flex items-center justify-between cursor-pointer bg-gray-50 border-b border-gray-200"
                                  onClick={() => handleSubCategoryClick(subCategory.sub_id, mainItem.main_text_id)}
                                >
                                  <div className="flex items-center gap-3">
                                    {/* Checkbox for sub category */}
                                    <div
                                      className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center ${
                                        subCategoryStatus === 2
                                          ? 'bg-blue-500 text-white'
                                          : subCategoryStatus === 1
                                          ? 'bg-blue-100 border border-blue-300'
                                          : 'border border-gray-300 bg-white'
                                      }`}
                                    >
                                      {subCategoryStatus > 0 && (
                                        <Check
                                          size={14}
                                          className={subCategoryStatus === 2 ? 'text-white' : 'text-blue-500'}
                                        />
                                      )}
                                    </div>

                                    <div>
                                      <h3 className="text-base font-medium">{subCategory.sub_name}</h3>
                                      <p className="text-sm text-gray-500">{subCategory.sub_description}</p>
                                    </div>
                                  </div>

                                  {/* Completion indicator */}
                                  <div className="flex items-center gap-3">
                                    <div className="text-sm text-gray-500">
                                      {completedResourceCount}/{subCategory.resources.length}
                                    </div>

                                    {/* Mini progress bar */}
                                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-blue-500 rounded-full"
                                        style={{
                                          width: `${(completedResourceCount / subCategory.resources.length) * 100}%`,
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>

                                {/* Resources */}
                                <div className="p-3 space-y-2 bg-white">
                                  {subCategory.resources.map((resource) => {
                                    const isResourceCompleted = completedItems.resources.includes(resource.resource_id);

                                    return (
                                      <div 
                                        key={resource.resource_id} 
                                        className="flex items-start gap-3"
                                      >
                                        {/* Checkbox for resource */}
                                        <div 
                                          className="pt-1"
                                          onClick={() => handleResourceClick(
                                            resource.resource_id, 
                                            subCategory.sub_id, 
                                            mainItem.main_text_id
                                          )}
                                        >
                                          <div
                                            className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center cursor-pointer ${
                                              isResourceCompleted
                                                ? 'bg-blue-500 text-white'
                                                : 'border border-gray-300 bg-white'
                                            }`}
                                          >
                                            {isResourceCompleted && <Check size={12} />}
                                          </div>
                                        </div>

                                        {/* Resource information */}
                                        <div className="flex-grow">
                                          <p className={`text-sm ${isResourceCompleted ? 'font-medium' : 'text-gray-700'}`}>
                                            {resource.resource_description}
                                          </p>
                                          <a 
                                            href={resource.resource_link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-xs text-blue-500 hover:underline flex items-center gap-1"
                                          >
                                            {resource.resource_link}
                                            <ExternalLink size={12} />
                                          </a>
                                        </div>
                                      </div>
                                    );
                                  })}
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
      </div>
      
      {/* Scroll to top button - only visible when scrolled down */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-blue-500 text-white shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors z-20"
          aria-label="Scroll to top"
        >
          <ChevronDown size={24} className="transform rotate-180" />
        </button>
      )}
    </div>
  );
};

export default Roadmap;