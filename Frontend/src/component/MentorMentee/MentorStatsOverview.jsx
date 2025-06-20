// MentorStatsOverview.jsx
import React from 'react';
import {
  Users,
  Clock,
  Star,
  TrendingUp,
  Calendar,
  Award,
  Target,
  CheckCircle,
  UserPlus,
  MessageCircle,
  X,
} from 'lucide-react';

const MentorStatsOverview = ({ statsData, userDetails }) => {
  // Calculate percentage changes and trends
  const getPercentageChange = (current, previous) => {
    if (!previous || previous === 0) return 0;
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  const getImpactLevel = (totalMentees) => {
    if (totalMentees >= 50) return { level: 'Elite', color: 'text-purple-600', bgColor: 'bg-purple-100' };
    if (totalMentees >= 20) return { level: 'Expert', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (totalMentees >= 10) return { level: 'Advanced', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (totalMentees >= 5) return { level: 'Rising', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { level: 'Getting Started', color: 'text-gray-600', bgColor: 'bg-gray-100' };
  };

  const impactLevel = getImpactLevel(statsData.totalMentees);

  const StatCard = ({ icon: Icon, title, value, change, changeType, color, bgColor, subtitle }) => (
    <div className="bg-white rounded-lg shadow-sm border align-middle border-gray-200 p-6 hover:shadow-md transition-shadow">
      <h1 className=" text-xl font-medium text-gray-900">{title}</h1>
      <h3 className=" text-xl mt-2 font-bold text-gray-600">{value}</h3>
    </div>
  );

  const AchievementBadge = ({ title, description, icon: Icon, achieved, color }) => (
    <div
      className={`p-4 rounded-lg border-2 ${
        achieved ? `border-${color}-200 bg-${color}-50` : 'border-gray-200 bg-gray-50'
      } transition-all`}
    >
      <div className="flex items-center space-x-3">
        <Icon className={`h-8 w-8 ${achieved ? `text-${color}-600` : 'text-gray-400'}`} />
        <div>
          <h4 className={`font-medium ${achieved ? `text-${color}-900` : 'text-gray-500'}`}>{title}</h4>
          <p className={`text-sm ${achieved ? `text-${color}-700` : 'text-gray-400'}`}>{description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Welcome Header with Impact Level */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, {userDetails.name}!</h2>
            <p className="text-blue-100 mt-1">You're making a real difference in students' lives</p>
          </div>
          <div className="text-right">
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${impactLevel.bgColor} ${impactLevel.color}`}
            >
              <Award className="h-4 w-4 mr-1" />
              {impactLevel.level} Mentor
            </div>
            <p className="text-blue-100 text-sm mt-1">{statsData.totalMentees} students mentored</p>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-2 border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sml text-gray-600 mt-1 ml-2">
              {statsData.pendingRequests > 0
                ? `You have ${statsData.pendingRequests} students waiting to learn from you!`
                : 'Your expertise can help more students achieve their goals.'}
            </p>
          </div>
          <div className="flex space-x-3">
            {statsData.pendingRequests > 0 && (
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium">
                Review Requests ({statsData.pendingRequests})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Calendar}
          title="Total Sessions"
          value={statsData.totalSessions}
          change={getPercentageChange(statsData.totalSessions, statsData.previousTotalSessions)}
          changeType={statsData.totalSessions >= (statsData.previousTotalSessions || 0) ? 'positive' : 'negative'}
          color="text-blue-600"
          bgColor="bg-blue-100"
          subtitle="All time"
        />

        <StatCard
          icon={CheckCircle}
          title="Completed This Month"
          value={statsData.completedThisMonth}
          change={getPercentageChange(statsData.completedThisMonth, statsData.completedLastMonth)}
          changeType={statsData.completedThisMonth >= (statsData.completedLastMonth || 0) ? 'positive' : 'negative'}
          color="text-green-600"
          bgColor="bg-green-100"
          subtitle={`vs ${statsData.completedLastMonth || 0} last month`}
        />
        <StatCard
          icon={Star}
          title="Average Rating"
          value={`${statsData.averageRating || 0}/5`}
          color="text-yellow-600"
          bgColor="bg-yellow-100"
          subtitle={`Based on ${statsData.totalFeedbacks || 0} reviews`}
        />

        <StatCard
          icon={Clock}
          title="Total Hours"
          value={`${statsData.totalHours}h`}
          color="text-teal-600"
          bgColor="bg-teal-100"
          subtitle="Time invested in mentoring"
        />
      </div>

      {/* Achievements Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Award className="h-5 w-5 mr-2 text-yellow-600" />
          Your Achievements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AchievementBadge
            title="First Session"
            description="Complete your first mentoring session"
            icon={Target}
            achieved={statsData.totalSessions >= 1}
            color="green"
          />
          <AchievementBadge
            title="Mentor Milestone"
            description="Complete 10 mentoring sessions"
            icon={CheckCircle}
            achieved={statsData.totalSessions >= 10}
            color="blue"
          />
          <AchievementBadge
            title="Student Favorite"
            description="Achieve 4.5+ average rating"
            icon={Star}
            achieved={statsData.averageRating >= 4.5}
          />
        </div>
      </div>
    </div>
  );
};

export default MentorStatsOverview;
