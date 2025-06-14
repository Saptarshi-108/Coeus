// src/components/CoeusTyper.jsx
import React from "react";
import Typewriter from "typewriter-effect";

const Typer = () => {
  return (
    <div className="absolute bottom-8 right-8 text-right bg-gradient-to-r from-slate-500 to-slate-50 bg-clip-text text-transparent max-w-4xl mb-60 mr-30 text-8xl">
      <Typewriter
        options={{
          strings: [
            "Meet Coeus , your intelligent HR ally.",
            "Simplifying hiring, onboarding, and policies with precision.",
            "Say goodbye to paperwork. Say hello to smart HR.",
          ],
          autoStart: true,
          loop: true,
          delay: 60,
          deleteSpeed: 40,
          pauseFor: 2000,
        }}
      />
    </div>
  );
};

export default Typer;
