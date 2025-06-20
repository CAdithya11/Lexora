import { useEffect, useState } from 'react';
import MentorStatsOverview from '../../../../component/MentorMentee/MentorStatsOverview';
import axios from 'axios';
import Alert from '../../../../component/template/alert/Alert';
import SidebarSub from '../../../../component/template/SidebarSub';
import TopHeader from '../../../../component/template/TopHeader';

export default function MentorStatsDashboardPage() {
  const userDetails = JSON.parse(localStorage.getItem('user'));
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [mentorStats, setMentorStats] = useState({
    totalSessions: 723,
    previousTotalSessions: 43567,
    completedThisMonth: 123,
    completedLastMonth: 23,
    pendingRequests: 12,
    upcomingMeetings: 23,
    totalMentees: 12,
    averageRating: 4.5,
    totalFeedbacks: 12,
    totalHours: 155436,
  });

  // Add this function to fetch mentor statistics
  const fetchMentorStats = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v2/mentor/stats/${userDetails.user_id}`);
      setMentorStats(response.data);
    } catch (error) {
      console.error('Error fetching mentor stats:', error);
    }
  };

  // Modify your useEffect to include stats fetching
  useEffect(() => {
    if (userDetails && userDetails.user_id) {
      if (userDetails.role === 'MENTOR') {
        fetchMentorStats();
      }
    }
  }, [userDetails]);
  return (
    <>
      {alertMessage && <Alert message={alertMessage} type={alertType} />}
      <div className="flex h-screen overflow-hidden bg-white">
        <SidebarSub />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <TopHeader HeaderMessage={'Meetings'} />

          <div className="flex-1 flex m-5 flex-col pt-5 pl-10 overflow-auto">
            <div className="mb-8">
              <MentorStatsOverview statsData={mentorStats} userDetails={userDetails} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
