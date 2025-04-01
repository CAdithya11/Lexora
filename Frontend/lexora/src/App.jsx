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
import UserProfileSettings from './pages/Home/UserProfileSettings';
import CareerPersosna from './pages/Functions/CareerPersonaMatching/PersonaMatcher';
import MatchedPersosna from './pages/Functions/CareerPersonaMatching/MatchedPersona';
import Skill from './pages/Functions/SkillGapAnalyzer/SkillGapAnalyzer';
import Skill1 from './pages/Functions/SkillGapAnalyzer/SkillQuiz';
import Skill2 from './pages/Functions/SkillGapAnalyzer/Results';
import Skill3 from './pages/Functions/SkillGapAnalyzer/Resultvisualize';

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
          <Route path="/team" element={<TeamPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/runBrain" element={<IndustryInsightsGenerator />} />
          <Route path="/settings" element={<UserProfileSettings />} />

          {/* Real-time industry insights dashboard */}
          <Route path="/jobTrendings" element={<TrendingJobsPage />} />

          {/* Personolized Roadmap Generator  */}
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/searchRoadmap" element={<SearchRoadmapPage />} />
          <Route path="/RoadmapDetails" element={<RoadmapDetailsPage />} />
          <Route path="/PersonaMatching" element={<CareerPersosna />} />
          <Route path="/Personas" element={<MatchedPersosna />} />
          <Route path="/persona" element={<Persona />} />
          <Route path="/rgapi" element={<RoadmapGeminiApi />} />
          <Route path="/ro" element={<RoadmapOption />} />
          <Route path="/sk" element={<Skill />} />
          <Route path="/sk1" element={<Skill1 />} />
          <Route path="/sk2" element={<Skill2 />} />
          <Route path="/sk3" element={<Skill3 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
