import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TrendingJobsPage from './pages/Functions/Industry Insights/TrendingJobsPage';
import SignIn from './pages/Home/SignIn';
import SignUpPage from './pages/Home/SignUpPage';
//Roadmap Generator
import SearchRoadmapPage from './pages/Functions/Roadmap/SearchRoadmapPage';
import RoadmapPage from './pages/Functions/Roadmap/RoadmapPage';

import ContactUsPage from './pages/Home/ContactUsPage';
import TeamPage from './pages/Home/TeamPage';
import RoadmapDetailsPage from './pages/Functions/Roadmap/RoadmapDetailsPage';
import Persona from './pages/Functions/CareerPersonaMatching/PersonaMatcher';
import Persona1 from './pages/Functions/CareerPersonaMatching/MatchedPersona';
import RoadmapGeminiApi from './component/Roadmaps/RoadmapGeminiApi';
import HomePage from '../src/pages/Home/HomePage';

// import CareerPersosna from './pages/Functions/CareerPersonaMatching/PersonaMatcher';
// import MatchedPersosna from './pages/Functions/CareerPersonaMatching/PersonaMatcher';
import Skill from './pages/Functions/SkillGapAnalyzer/SkillGapAnalyzer';
import Skill1 from './pages/Functions/SkillGapAnalyzer/SkillQuiz';
import Skill2 from './pages/Functions/SkillGapAnalyzer/Results';
import Skill3 from './pages/Functions/SkillGapAnalyzer/Resultvisualize';

import FeedbackPage from './pages/Home/FeedbackPage';
import { ProtectedRoute } from './component/template/protectedRoute/ProtectedRoute';
import UserProfileSettings from './pages/Home/Settings/UserProfileSettings';
import UserChangePassword from './pages/Home/Settings/UserChangePassword';
import UserProfessionalDetails from './pages/Home/Settings/UserProfessionalDetails';
import JobTrendsPage from './pages/Functions/Industry Insights/JobTrendsPage';
import SalaryTrendsPage from './pages/Functions/Industry Insights/SalaryTrendsPage';

import MentorDashboard from './pages/Functions/MentorMenteeMatchmaking/MentorDashboard';
import MenteeDashboard from './pages/Functions/MentorMenteeMatchmaking/MenteeDashboard';
import MentorSessions from './pages/Functions/MentorMenteeMatchmaking/MentorSession';
import SkillTrendsPage from './pages/Functions/Industry Insights/SkillTrendsPage';

import MenteeSelectMedia from './pages/Functions/MentorMenteeMatchmaking/MenteeSelectMedia';
import MenteeAddMatchingCriteria from './pages/Functions/MentorMenteeMatchmaking/MenteeAddMatchingCriteria';
import MenteeMatchmaking from './pages/Functions/MentorMenteeMatchmaking/MenteeMatchmaking';
import AboutUsPage from './pages/Home/AboutUsPage';

function App() {
  return (
    <>
      <BrowserRouter basename="/Lexora">
        <Routes>
          {/* LEXORA COMMON PAGES  */}
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/contactUs" element={<ContactUsPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />

          {/* <Route path="/PersonaMatching" element={<CareerPersosna />} />
          <Route path="/Personas" element={<MatchedPersosna />} />
          <Route path="/persona" element={<Persona />} /> */}
          <Route path="/rgapi" element={<RoadmapGeminiApi />} />
          {/* <Route path="/ro" element={<RoadmapOption />} /> */}
          <Route path="/sk" element={<Skill />} />
          <Route path="/sk1" element={<Skill1 />} />
          <Route path="/sk2" element={<Skill2 />} />
          <Route path="/sk3" element={<Skill3 />} />

          <Route element={<ProtectedRoute />}>
            {/* User profiles based*/}
            <Route path="/settings/profile" element={<UserProfileSettings />} />
            <Route path="/settings/password" element={<UserChangePassword />} />
            <Route path="/settings/professionalDetails" element={<UserProfessionalDetails />} />

            {/* Real-time industry insights dashboard */}
            <Route path="/jobTrendings" element={<TrendingJobsPage />} />
            <Route path="/jobTrends" element={<JobTrendsPage />} />
            <Route path="/salaryTrends" element={<SalaryTrendsPage />} />
            <Route path="/skillTrends" element={<SkillTrendsPage />} />
            <Route path="/personas" element={<Persona />} />
            <Route path="/persona" element={<Persona1 />} />


            {/* Personolized Roadmap Generator  */}
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/searchRoadmap" element={<SearchRoadmapPage />} />
            <Route path="/RoadmapDetails" element={<RoadmapDetailsPage />} />
            <Route path="/rgapi" element={<RoadmapGeminiApi />} />

            {/* Mentor Mentee matchmaking */}
            <Route path="/mentorDashboard" element={<MentorDashboard />} />
            <Route path="/menteeDashboard" element={<MenteeDashboard />} />
            <Route path="/mentorSessions" element={<MentorSessions />} />
            <Route path="/menteeSelectMedia" element={<MenteeSelectMedia />} />
            <Route path="/menteeAddMatchingCriteria" element={<MenteeAddMatchingCriteria />} />
            <Route path="/menteeMatchmaking" element={<MenteeMatchmaking />} />
            {/* <Route path="/bookSession" element={<BookSession />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
