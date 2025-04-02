import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TrendingJobsPage from './pages/Functions/Industry Insights/TrendingJobsPage';
import SignIn from './pages/Home/SignIn';
import SignUpPage from './pages/Home/SignUpPage';

import SearchRoadmapPage from './pages/Functions/Roadmap/SearchRoadmapPage';
import RoadmapPage from './pages/Functions/Roadmap/RoadmapPage';
import RoadmapOption from './component/Roadmaps/RoadmapOption';

import ContactUsPage from './pages/Home/ContactUsPage';
import TeamPage from './pages/Home/TeamPage';
import RoadmapDetailsPage from './pages/Functions/Roadmap/RoadmapDetailsPage';
import Persona from './pages/Functions/Roadmap/Persona';
import RoadmapGeminiApi from './component/Roadmaps/RoadmapGeminiApi';
import HomePage from '../src/pages/Home/HomePage';
import IndustryInsightsGenerator from './pages/Functions/Industry Insights/Brain/IndustryInsightsGenerator';

import CareerPersosna from './pages/Functions/CareerPersonaMatching/PersonaMatcher';
import MatchedPersosna from './pages/Functions/CareerPersonaMatching/MatchedPersona';
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


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* LEXORA COMMON PAGES  */}
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/contactUs" element={<ContactUsPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/jobTrends" element={<JobTrendsPage />} />
          <Route path="/salaryTrends" element={<SalaryTrendsPage />} />
          <Route path="/PersonaMatching" element={<CareerPersosna />} />
          <Route path="/Personas" element={<MatchedPersosna />} />
          <Route path="/persona" element={<Persona />} />
          <Route path="/rgapi" element={<RoadmapGeminiApi />} />
          <Route path="/ro" element={<RoadmapOption />} />
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
            <Route path="/runBrain" element={<IndustryInsightsGenerator />} />

            {/* Personolized Roadmap Generator  */}
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/searchRoadmap" element={<SearchRoadmapPage />} />
            <Route path="/RoadmapDetails" element={<RoadmapDetailsPage />} />
            <Route path="/rgapi" element={<RoadmapGeminiApi />} />
            <Route path="/ro" element={<RoadmapOption />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
