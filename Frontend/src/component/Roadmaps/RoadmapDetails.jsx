import axios from 'axios';
import React, { useState, useEffect } from 'react';

const RoadmapDetails = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sampleData,setSampleData] = useState([])

  // Simulating data for demonstration
  useEffect(() => {
    // In a real application, you would use axios to fetch data
    // This is just for demonstration purposes
    const fetchData = async () => {
    setIsLoading(true);
    fetchRoadmapDetails();
    };
    // Simulate API call delay
    setTimeout(fetchData, 1000);
  }, []);

  const fetchRoadmapDetails = (async()=>{
    try {
      const response = await axios.get(`http://localhost:8080/api/roadmaps/user/2`);
      const dataList = response.data; // Make sure the backend returns an array
      console.log("MAPPED DATA", dataList)
      const mappedData = dataList.map(data => ({
        r_Id: data.r_Id,
        job_name: data.job_name,
      }));
      

      setSampleData(mappedData);
      setRoadmaps(mappedData);
      setError(null);
    } catch (err) {
      console.error('Error fetching roadmaps:', err);
      setError('Failed to load roadmaps. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  })

  const handleDelete = (id) => {
    /* if (window.confirm('Are you sure you want to delete this roadmap?')) {
      // In a real app, you would make an API call to delete
      // For now, we'll just filter the state
      setRoadmaps(roadmaps.filter(roadmap => roadmap.r_Id !== id));
      alert('Roadmap deleted successfully');
  }
 */
    try {
      const response = axios.delete(`http://localhost:8080/api/roadmaps/rid/${id}`);
      console.log(response.data);
      alert('Roadmap deleted successfully');
      fetchRoadmapDetails();
    } catch (error) {
      console.log(error);
      window.alert("Network error. Failed to connect to network. Plaease check your internet connection");
    }
  };

  const handleEdit = (id) => {
    // In a real app, you would navigate to the edit page
    // For demo purposes, we'll just show an alert
    alert(`Navigating to edit roadmap with ID: ${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 border border-red-200 rounded-lg bg-red-50 text-red-700">
        <h3 className="font-bold mb-2">Error</h3>
        <p>{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-5">Your Roadmaps</h2>
      
      {roadmaps.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-gray-600">No roadmaps found. Create a new roadmap to get started.</p>
          <button 
            className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => alert('Navigate to create roadmap page')}
          >
            Create Roadmap
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Name
                </th>
                <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {roadmaps.map((roadmap) => (
                <tr key={roadmap.r_Id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm text-gray-900">{roadmap.r_Id}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{roadmap.job_name}</td>
                  <td className="py-4 px-6 text-sm font-medium text-center">
                    <div className="flex justify-center space-x-2">
                      {/* <button 
                        onClick={() => handleEdit(roadmap.r_Id)}
                        className="text-blue-600 hover:text-blue-900 px-3 py-1 bg-blue-100 rounded"
                      >
                        Edit
                      </button> */}
                      <button
                        onClick={() => handleDelete(roadmap.r_Id)}
                        className="text-red-600 hover:text-red-900 px-3 py-1 bg-red-100 rounded"
                      >
                        Delete
                      </button>
                    </div>  
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
    </div>
  );
};

export default RoadmapDetails;