import React, { useEffect, useState } from "react";
import SidebarSub from "../../../component/template/SidebarSub";
import TopHeaderMentor from "../../../component/MentorMentee/TopHeaderMentor";
import axios from "axios";

// const [mentors,setMentors] = useState<MentorType[]>([])
const mentors = [
  {
    name: "Jessica Gutierrez",
    degree: "BSc (Hons) in Software Engineering",
    description:
      "I aim to bring out your strengths and be an empathetic, supportive, and non-judgmental person for you",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sofia Webb",
    degree: "BSc (Hons) in Network Engineering",
    description:
      "I aim to bring out your strengths and be an empathetic, supportive, and non-judgmental person for you",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Jessica Gutierrez",
    degree: "BSc (Hons) in Biomedical Science",
    description:
      "I aim to bring out your strengths and be an empathetic, supportive, and non-judgmental person for you",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Jessica Gutierrez",
    degree: "BSc (Hons) in Software Engineering",
    description:
      "I aim to bring out your strengths and be an empathetic, supportive, and non-judgmental person for you",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
];

// async function loadMentors() {
//     const response = await axios.get("");
//     setMentors(response.data);    
// }

// useEffect(function (){
//     loadMentors();
// },[])

export default function MenteeDashboard() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <SidebarSub />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <TopHeaderMentor />
        {/* Header */}
        <div className="bg-white pb-4">
          <h1 className="text-2xl font-bold pb-2 border-b border-gray-300 mt-6 mb-4">Suggested Mentors</h1>
        </div>

        {/* Start Matchmaking Button */}
        <div className="flex justify-end mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Start Matchmaking
          </button>
        </div>

        {/* Mentor Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mentors.map((mentor, index) => (
            <div key={index} className="bg-white p-4 shadow-lg ring-2 ring-gray-50 text-center">
              <img
                src={mentor.image}
                alt={mentor.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold">{mentor.name}</h3>
              <p className="text-gray-500 text-sm">{mentor.degree}</p>
              <p className="text-gray-600 text-xs mt-2">{mentor.description}</p>
              <button className="mt-4 bg-gray-800 text-white px-4 py-2 text-sm rounded-lg hover:bg-gray-900">
                Book a Session
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
