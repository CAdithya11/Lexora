
import TrendingJobsPage from './pages/Functions/Industry Insights/TrendingJobsPage';
import SignIn from './pages/Home/SignIn';
import SignUpPage from './pages/Home/SignUpPage';

import SearchRoadmapPage from './pages/Functions/Roadmap/SearchRoadmapPage';
import RoadmapPage from './pages/Functions/Roadmap/RoadmapPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/jobTrendings" element={<TrendingJobsPage />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/srp" element={<SearchRoadmapPage />} />

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
