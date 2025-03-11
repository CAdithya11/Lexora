import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TrendingJobsPage from './pages/Functions/Industry Insights/TrendingJobsPage';
import HomePage from './pages/Home/HomePage';
import SignIn from './pages/Home/SignIn';
import SignUpPage from './pages/Home/SignUpPage';
import SearchRoadmapPage from './pages/Functions/Roadmap/SearchRoadmapPage';
import RoadmapPage from './pages/Functions/Roadmap/RoadmapPage';

function App() {
  return (
    <>
      <RoadmapPage />
    </>
  );
}

export default App;
