<<<<<<< HEAD
import SidebarSub from './component/template/SidebarSub';
import SearchRoadmapPage from './pages/Functions/Roadmap/SearchRoadmapPage';
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoadmapPage from './pages/Functions/RoadmapPage';
import TrendingJobsPage from './pages/Functions/Industry Insights/TrendingJobsPage';
import HomePage from './pages/Home/HomePage';
import SignIn from './pages/Home/SignIn';
import SignUpPage from './pages/Home/SignUpPage';
>>>>>>> b8958e14fd471f8d996054334348245ec8750169

function App() {
  return (
    <>
<<<<<<< HEAD
      <SearchRoadmapPage/>
=======
      <BrowserRouter>
        <Routes>
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/jobTrendings" element={<TrendingJobsPage />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
>>>>>>> b8958e14fd471f8d996054334348245ec8750169
    </>
  );
}

export default App;
