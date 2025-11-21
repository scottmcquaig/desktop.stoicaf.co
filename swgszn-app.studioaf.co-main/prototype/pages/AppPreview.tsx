
import React, { useState, useEffect } from 'react';
import { APP_SPEC } from '../services/appSpecService';
import Mockups, { AuthMockup, OnboardingMockup, DashboardMockup, JournalListMockup, JournalNewMockup, InsightsMockup, SettingsMockup } from '../components/AppMockups';
import { 
  Smartphone, 
  Terminal, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  Circle, 
  Key, 
  LayoutDashboard, 
  FileText, 
  CheckCircle, 
  Circle as RadioUnchecked,
  CheckCircle as CheckFilled,
  Play
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AppPreview: React.FC = () => {
  const [activeSection, setActiveSection] = useState(APP_SPEC[0].id);
  const [viewMode, setViewMode] = useState<'wireframe' | 'ui'>('wireframe');

  // Map section IDs to Mockup components
  const getMockupComponent = (sectionId: string) => {
    if (sectionId.includes('auth')) return <AuthMockup />;
    if (sectionId === 'onboarding') return <OnboardingMockup />;
    if (sectionId === 'dashboard') return <DashboardMockup />;
    if (sectionId === 'journal') {
        return (
            <div className="space-y-12">
                <div>
                   <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">View: Entry List</h3>
                   <JournalListMockup />
                </div>
                <div className="border-t border-slate-200 pt-12">
                   <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">View: New Entry Editor</h3>
                   <JournalNewMockup />
                </div>
            </div>
        );
    }
    
    if (sectionId === 'insights') return <InsightsMockup />;
    if (sectionId === 'settings') return <SettingsMockup />;
    
    return (
        <div className="flex flex-col items-center justify-center h-96 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 text-slate-400">
            <Terminal className="mb-4 opacity-50" size={48} />
            <p className="font-bold">No visual mockup available for this section.</p>
            <p className="text-sm">Switch to Wireframe mode to view specifications.</p>
        </div>
    );
  };

  // Reset view mode if section doesn't support UI
  useEffect(() => {
      const supportsUI = ['auth-pages', 'onboarding', 'dashboard', 'journal', 'insights', 'settings'].includes(activeSection);
      if (!supportsUI && viewMode === 'ui') {
          setViewMode('wireframe');
      }
  }, [activeSection]);

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, i) => {
      // Header 2
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-3xl font-bold text-slate-900 mt-12 mb-6 pb-2 border-b border-slate-200">{line.replace('## ', '')}</h2>;
      }
      // Header 3
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-2xl font-bold text-slate-800 mt-10 mb-4">{line.replace('### ', '')}</h3>;
      }
      // Header 4
      if (line.startsWith('#### ')) {
        return <h4 key={i} className="text-xl font-bold text-stoic-blue mt-8 mb-3">{line.replace('#### ', '')}</h4>;
      }
      // Bold Status lines
      if (line.trim().startsWith('**Status**:')) {
        return (
          <div key={i} className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider bg-slate-100 inline-block px-3 py-1 rounded-md mb-4 text-slate-700 border border-slate-200">
            {line.replace(/\*\*/g, '')}
          </div>
        );
      }
      // Code Blocks (Wireframes) - Skipped here, handled in parent
      if (line.trim().startsWith('```')) return null;
      
      // Checklists
      if (line.trim().startsWith('- [ ]')) {
        return (
          <div key={i} className="flex items-start gap-2 mb-2 text-slate-600">
            <RadioUnchecked className="mt-1 text-slate-400 flex-shrink-0" size={16} />
            <span>{line.replace('- [ ]', '')}</span>
          </div>
        );
      }
      if (line.trim().startsWith('- ✅')) {
        return (
          <div key={i} className="flex items-start gap-2 mb-2 text-slate-700 font-medium">
            <CheckFilled className="mt-1 text-green-500 flex-shrink-0" size={16} />
            <span>{line.replace('- ✅', '')}</span>
          </div>
        );
      }
      
      // List items
      if (line.trim().startsWith('- ')) {
          return <li key={i} className="ml-4 text-slate-700 mb-1 list-disc">{line.replace('- ', '')}</li>
      }

      if (line.trim() === '') return <br key={i}/>;

      return <p key={i} className="mb-2 text-slate-600 leading-relaxed">{line}</p>;
    });
  };

  // Helper to parse the whole block including code blocks
  const ParsedContent = ({ content }: { content: string }) => {
    const parts = content.split(/```/g);
    
    return (
      <div>
        {parts.map((part, index) => {
          if (index % 2 === 1) {
            // This is a code block (wireframe)
            return (
              <div key={index} className="my-8 relative group">
                <div className="absolute -top-3 right-4 bg-slate-800 text-slate-400 text-xs px-2 py-1 rounded font-mono uppercase tracking-wider border border-slate-700">
                  ASCII_WIREFRAME_V1
                </div>
                <pre className="bg-slate-900 text-green-400 p-6 rounded-xl overflow-x-auto font-mono text-xs md:text-sm leading-relaxed shadow-2xl border border-slate-700 selection:bg-green-900 selection:text-white">
                  {part}
                </pre>
              </div>
            );
          } else {
            // Normal text
            return <div key={index}>{renderContent(part)}</div>;
          }
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 lg:w-80 bg-slate-50 border-r border-slate-200 md:h-screen md:sticky md:top-0 overflow-y-auto z-10">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8 text-stoic-blue">
            <Smartphone size={24} />
            <span className="font-extrabold text-lg tracking-tight text-slate-900">APP UI KIT</span>
          </div>
          
          <nav className="space-y-1">
            {APP_SPEC.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  window.scrollTo(0, 0);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-all flex items-center gap-3 ${
                  activeSection === section.id
                    ? 'bg-white text-stoic-blue shadow-md border border-slate-100 ring-1 ring-black/5'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {section.id === 'structure' && <LayoutDashboard size={18} />}
                {section.id.includes('auth') && <Key size={18} />}
                {section.id === 'dashboard' && <LayoutDashboard size={18} />}
                {section.id === 'journal' && <FileText size={18} />}
                {section.id === 'status' && <CheckCircle size={18} />}
                {!['structure', 'dashboard', 'journal', 'status'].includes(section.id) && !section.id.includes('auth') && <Circle size={12} />}
                <span className="truncate">{section.title}</span>
              </button>
            ))}
          </nav>

          <div className="mt-8">
              <Link to="/app" className="w-full bg-slate-900 hover:bg-slate-800 text-white px-4 py-3 rounded-lg text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2">
                  <Play size={16} /> Launch Prototype
              </Link>
          </div>

          <div className="mt-12 p-4 bg-slate-100 rounded-lg border border-slate-200">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Version Control</h4>
            <div className="flex justify-between text-xs text-slate-600 font-mono">
              <span>Build:</span>
              <span>v0.9.2 (Beta)</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600 font-mono mt-1">
              <span>Updated:</span>
              <span>Nov 17, 2025</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
          
          {/* Header Area */}
          <div className="mb-12 pb-8 border-b border-slate-100 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
                <span className="text-stoic-blue font-bold uppercase tracking-widest text-xs bg-sky-50 px-3 py-1 rounded-full border border-sky-100 mb-4 inline-block">
                Technical Specification
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
                STOIC AF Master Plan
                </h1>
            </div>

            {/* View Toggle */}
            <div className="bg-slate-100 p-1 rounded-lg flex items-center shadow-inner">
                <button 
                    onClick={() => setViewMode('wireframe')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${
                        viewMode === 'wireframe' 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    <Terminal size={18} />
                    Specs
                </button>
                <button 
                    onClick={() => setViewMode('ui')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${
                        viewMode === 'ui' 
                        ? 'bg-stoic-blue text-white shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    <Eye size={18} />
                    Live UI
                </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="min-h-[600px]">
              {viewMode === 'wireframe' ? (
                  <div className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-stoic-blue animate-in fade-in duration-300">
                      <ParsedContent content={APP_SPEC.find(s => s.id === activeSection)?.content || ''} />
                  </div>
              ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="bg-slate-100 rounded-2xl p-2 md:p-8 border border-slate-200 shadow-inner min-h-[600px] flex flex-col relative overflow-hidden">
                            {/* Fake Browser Bar/Phone Header styling purely for aesthetic */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-stoic-blue via-purple-500 to-pink-500 opacity-20"></div>
                            
                            {/* Render Mockup */}
                            <div className="flex-grow">
                                {getMockupComponent(activeSection)}
                            </div>

                            <div className="text-center mt-8 text-xs text-slate-400 font-mono uppercase tracking-widest">
                                Interactive Preview • {activeSection}
                            </div>
                      </div>
                  </div>
              )}
          </div>
          
          {/* Footer Nav */}
          <div className="mt-20 pt-8 border-t border-slate-100 flex justify-between">
            <button 
               onClick={() => {
                 const idx = APP_SPEC.findIndex(s => s.id === activeSection);
                 if (idx > 0) {
                   setActiveSection(APP_SPEC[idx - 1].id);
                   window.scrollTo(0, 0);
                 }
               }}
               disabled={APP_SPEC.findIndex(s => s.id === activeSection) === 0}
               className="text-slate-500 font-bold hover:text-stoic-blue disabled:opacity-30 transition-colors flex items-center gap-2"
            >
              <ChevronLeft size={16} /> Previous Section
            </button>
            
            <button 
               onClick={() => {
                 const idx = APP_SPEC.findIndex(s => s.id === activeSection);
                 if (idx < APP_SPEC.length - 1) {
                   setActiveSection(APP_SPEC[idx + 1].id);
                   window.scrollTo(0, 0);
                 }
               }}
               disabled={APP_SPEC.findIndex(s => s.id === activeSection) === APP_SPEC.length - 1}
               className="text-slate-500 font-bold hover:text-stoic-blue disabled:opacity-30 transition-colors flex items-center gap-2"
            >
              Next Section <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppPreview;
