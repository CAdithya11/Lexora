import { Bell } from "lucide-react";
import SidebarSub from "../../../component/template/SidebarSub";
import clsx from "clsx";
import React from "react";
import TopHeaderMentor from "../../../component/MentorMentee/TopHeaderMentor";

const MentorDashboard = () => {
  const sessions = [
    { name: "N M Bishar", date: "23/01/2025", time: "02:00 PM - 03:00 PM", status: "Upcoming" },
    { name: "Linal Uthsara Perera", date: "23/01/2025", time: "02:00 PM - 03:00 PM", status: "Completed" },
    { name: "Nishan pubudu kumara", date: "23/04/2025", time: "04:00 PM - 05:00 PM", status: "Upcoming" }
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <SidebarSub />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <TopHeaderMentor />
        <h1 className="text-2xl font-bold pb-2 border-b border-gray-300 mt-6 mb-6">Mentor Dashboard</h1>

        {/* Session Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6 mt-6">
          {[
            { count: "10", label: "Sessions", color: "text-purple-600" },
            { count: "05", label: "Pending Sessions", color: "text-yellow-500" },
            { count: "04", label: "Completed Sessions", color: "text-green-500" },
            { count: "01", label: "Rejected Sessions", color: "text-red-500" }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-4 shadow-lg ring-2 ring-gray-50 text-center rounded-lg">
              <h3 className={`text-xl font-bold ${stat.color}`}>{stat.count}</h3>
              <p>{stat.label}</p>
            </div>

          ))}
        </div>

        {/* My Sessions Table */}
        <h2 className="text-xl font-bold pb-2 mb-6">My Sessions</h2>
        <div className={"shadow-md ring-1 ring-gray-50"}>
          <div className="">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-blue-400">
                  <th className="p-2 text-left pl-9">Student Name</th>
                  <th className="p-2 text-left pl-6">Meeting Date</th>
                  <th className="p-2 text-left pl-6">Meeting Time</th>
                  <th className="p-2 text-left pl-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session, index) => (
                  <tr key={index} className="sadow-lg ring-1 ring-gray-50">
                    <td className="p-2 text-left pl-9">{session.name}</td>
                    <td className="p-2 pl-6">{session.date}</td>
                    <td className="p-2 pl-6">{session.time}</td>
                    <td className={clsx("p-2 font-semibold pl-6", {
                      "text-green-500": session.status === "Completed",
                      "text-blue-500": session.status === "Upcoming"
                    })}>
                      {session.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
