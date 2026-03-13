import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import SignToText from './pages/SignToText';
import LearnSigns from './pages/LearnSigns';
import GMeetExtension from './pages/GMeetExtension';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sign-to-text" element={<SignToText />} />
          <Route path="/learn" element={<LearnSigns />} />
          <Route path="/gmeet" element={<GMeetExtension />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
