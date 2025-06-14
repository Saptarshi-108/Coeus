import React from "react";
import GradientText from "../components/gradient"; // Corrected: changed 'GradientText' to 'gradient'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white py-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold leading-tight mb-4">
            About{" "}
            <GradientText from="blue-400" to="blue-700">
              Coeus
            </GradientText>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your Intelligent HR Ally for a Streamlined Future
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-4xl font-bold text-center mb-8">What We Do</h2>
          <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8">
            <p className="text-lg leading-relaxed mb-6">
              Coeus is an innovative, AI-powered HR platform designed to
              transform and simplify your human resources operations. We
              understand the complexities of modern HR – from talent acquisition
              to employee management and policy adherence. Our mission is to
              empower HR professionals with smart, automated tools that enhance
              efficiency, reduce manual overhead, and foster a more productive
              workplace.
            </p>
            <p className="text-lg leading-relaxed">
              By leveraging cutting-edge artificial intelligence, Coeus
              automates time-consuming tasks, provides insightful analytics, and
              ensures a seamless experience for both HR teams and employees.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-4xl font-bold text-center mb-8">
            Our Core Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1: Resume Scanner */}
            <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
              <div className="text-blue-500 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.75 17L9 20l-1 1h8l-1-1-1.25-3M15 10V5h2l2 1v4m-9 0V5H7L5 6v4m6 0h.01M12 15h.01M12 12h.01M12 9h.01M12 6h.01M12 3h.01M12 18h.01M12 21h.01"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Resume Scanner</h3>
              <p className="text-md text-gray-700 dark:text-gray-300">
                Quickly match candidates to job descriptions with AI-driven
                analysis, identifying the best fit based on skills, experience,
                and qualifications.
              </p>
            </div>

            {/* Service 2: Interview Scheduler */}
            <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
              <div className="text-green-500 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2">
                Interview Scheduler
              </h3>
              <p className="text-md text-gray-700 dark:text-gray-300">
                Automate the complex process of scheduling interviews, finding
                optimal slots for interviewers and candidates, and sending
                timely reminders.
              </p>
            </div>

            {/* Service 3: PolicyBot */}
            <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
              <div className="text-purple-500 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2">PolicyBot</h3>
              <p className="text-md text-gray-700 dark:text-gray-300">
                An intelligent chatbot that provides instant answers to employee
                queries regarding HR policies, freeing up HR staff for strategic
                tasks.
              </p>
            </div>

            {/* Service 4: Resume Personalizer */}
            <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
              <div className="text-orange-500 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2">
                Resume Personalizer
              </h3>
              <p className="text-md text-gray-700 dark:text-gray-300">
                Offers AI-driven suggestions to optimize resumes for specific
                job applications, enhancing candidate success rates and
                improving their chances of being noticed.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-4xl font-bold mb-8">Our Vision</h2>
          <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8">
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              At Coeus, we envision a future where HR departments are no longer
              bogged down by administrative burdens but are strategic partners
              in organizational growth. We are committed to continuous
              innovation, ensuring our platform evolves with the needs of the
              modern workforce and empowers businesses to achieve their full
              potential.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
