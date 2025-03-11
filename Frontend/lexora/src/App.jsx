import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoadmapPage from './pages/Functions/RoadmapPage';
import TrendingJobsPage from './pages/Functions/Industry Insights/TrendingJobsPage';
import HomePage from './pages/Home/HomePage';
import SignIn from './pages/Home/SignIn';
import SignUpPage from './pages/Home/SignUpPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/jobTrendings" element={<TrendingJobsPage />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUpPage />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
