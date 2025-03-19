import {BrowserRouter,Routes,Route} from "react-router-dom";

import TrendingJobsPage from './pages/Functions/Industry Insights/TrendingJobsPage';
import SignIn from './pages/Home/SignIn';
import SignUpPage from './pages/Home/SignUpPage';

import SearchRoadmapPage from './pages/Functions/Roadmap/SearchRoadmapPage';
import RoadmapPage from './pages/Functions/Roadmap/RoadmapPage';
import ContactUsPage from './pages/Home/ContactUsPage';
import TeamPage from './pages/Home/TeamPage';
import RoadmapDetailsPage from "./pages/Functions/Roadmap/RoadmapDetailsPage";
import RoadmapGeminiApi from "./component/Roadmaps/RoadmapGeminiApi";

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

          {/* Real-time industry insights dashboard */}
          <Route path="/jobTrendings" element={<TrendingJobsPage />} />

          {/* Personolized Roadmap Generator  */}
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/searchRoadmap" element={<SearchRoadmapPage />} />
          <Route path="/RoadmapDetails" element={<RoadmapDetailsPage />} />
          <Route path="/rgapi" element={<RoadmapGeminiApi />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
