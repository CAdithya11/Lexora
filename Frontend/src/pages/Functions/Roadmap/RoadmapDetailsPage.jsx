import React, { useState, useEffect } from 'react';
import RoadmapDetails from '../../../component/Roadmaps/RoadmapDetails';
import SidebarSub from '../../../component/template/SidebarSub';
import TopHeader from '../../../component/template/TopHeader';
import { Link } from 'react-router';
import axios from 'axios';
import Roadmap from '../../../component/Roadmaps/Roadmap';




export default function RoadmapPage() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [roadmapData,setRoadmapData] = useState(null);



  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowProfileDropdown(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Handle dropdown toggle without propagating events
  const toggleDropdown = (setter, currentState, e) => {
    e.stopPropagation();
    setter(!currentState);
  };

  const handleEdit = (id) => {
    try {
      const response = axios.get(`http://localhost:8080/api/roadmaps/rid/${id}`);
      response.then((e)=>setRoadmapData(e.data));
      console.log(roadmapData);
    } catch (error) {
      alert("Connection Failiure");
    }
  };

  
  return (
    <div className="flex overflow-hidden ">
      <SidebarSub />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader HeaderMessage={'Roadmap Details'} />
        <div className="flex-1 overflow-y-auto p-6">
          <div className=" mx-auto">
            <div className="bg-white  overflow-hidden">
              {roadmapData == null && 
              <>
              <Link to={'/searchRoadmap'}>
              <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Generate New Roadmap
              </button></Link>
              {/* Chart Content with Loading State */}
              <div className="p-6 min-h-96">
                {isLoading ? (
                  <div className="flex items-center justify-center h-80">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <RoadmapDetails handleEdit={handleEdit} />
                )}
              </div>
              </>
            }
            {roadmapData && 
              <Roadmap  JsonRoadmapData={roadmapData} />
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
