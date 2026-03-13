
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import SignToText from './pages/SignToText';
import LearnSigns from './pages/LearnSigns';
import GMeetExtension from './pages/GMeetExtension';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sign-to-text" element={<SignToText />} />
          <Route path="/learn" element={<LearnSigns />} />
          <Route path="/gmeet" element={<GMeetExtension />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
