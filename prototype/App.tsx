
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AppPreview from './pages/AppPreview';
import PrototypeLayout from './components/prototype/PrototypeLayout';
import Dashboard from './pages/prototype/Dashboard';
import JournalList from './pages/prototype/JournalList';
import JournalNew from './pages/prototype/JournalNew';
import Insights from './pages/prototype/Insights';
import Settings from './pages/prototype/Settings';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Design System / Specs - Main Landing */}
        <Route path="/" element={<AppPreview />} />

        {/* Interactive Prototype - Live Demo */}
        <Route path="/app" element={<PrototypeLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="journal" element={<JournalList />} />
            <Route path="journal/new" element={<JournalNew />} />
            <Route path="insights" element={<Insights />} />
            <Route path="settings" element={<Settings />} />
            <Route path="chat" element={<div className="p-8 text-center text-slate-500 font-bold">Chat Interface Placeholder</div>} />
        </Route>
        
        {/* Redirect any other route to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
