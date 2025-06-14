import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import ResumeScanner from "./pages/ResumeScanner";
import InterviewScheduler from "./pages/InterviewScheduler";
import ChatbotButton from "./components/chatbot";
import Navbar from "./components/Navbar"; // Import Navbar here, as it's a global component

// REMOVED: Imports for Typer, GradientText, FeatureCard, Testimonial
// These components are used within Landing.jsx and should be imported there.

function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        {/* Navbar is rendered here, outside of Routes, but inside Router,
            so it appears on all pages. */}
        <Navbar />

        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/services/resume-scanner" element={<ResumeScanner />} />
          <Route
            path="/services/interview-scheduler"
            element={<InterviewScheduler />}
          />
          {/* Add more routes as needed, e.g., for Resume Personalizer, Pricing, Contact */}
        </Routes>

        {/* Fixed Chatbot Button - always visible across all pages */}
        <ChatbotButton />
      </div>
    </Router>
  );
}

export default App;
