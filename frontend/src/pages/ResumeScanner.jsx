import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios"; // Ensure axios is installed

const ResumeScanner = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const RESUME_SCANNER_API_URL = import.meta.env.VITE_RESUME_SCANNER_API_URL;

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (selectedFiles.length === 0) {
      setError("Please select at least one file (Job Description + Resumes).");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("uploads", file); // 'uploads' matches FastAPI's parameter name
    });

    try {
      const response = await axios.post(
        `${RESUME_SCANNER_API_URL}/rank/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob", // Expecting a blob (CSV file)
        }
      );

      // Create a blob URL and trigger download
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ranked_resumes.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setMessage("Resumes ranked successfully! CSV file downloaded.");
    } catch (err) {
      console.error("Error ranking resumes:", err);
      if (err.response && err.response.data) {
        // Try to parse error message if available (FastAPI sends JSON errors)
        try {
          const reader = new FileReader();
          reader.onload = function () {
            const errorData = JSON.parse(reader.result);
            setError(`Error: ${errorData.detail || "Failed to rank resumes."}`);
          };
          reader.readAsText(err.response.data);
        } catch (parseError) {
          setError(
            `Error ranking resumes: ${err.message}. Could not parse detailed error.`
          );
        }
      } else {
        setError(
          `Error ranking resumes: ${err.message}. Please ensure the backend is running.`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white pb-10">
      <Navbar />
      <div className="container mx-auto p-8 py-16">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
          AI-Powered Resume Scanner
        </h1>
        <p className="text-center text-lg mb-8 text-gray-700 dark:text-gray-300">
          Upload your Job Description (filename should contain 'jd' or 'job')
          and multiple resumes (PDF, TXT, or ZIP) to get them ranked by AI.
        </p>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="file-upload"
                className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Upload Files
              </label>
              <input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100 dark:file:bg-blue-800 dark:file:text-blue-100 dark:hover:file:bg-blue-700"
                accept=".pdf,.txt,.zip"
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                (Include one JD file, and multiple resume files or a zip of
                resumes. Supported: PDF, TXT, ZIP)
              </p>
              {selectedFiles.length > 0 && (
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                  <p className="font-semibold">Selected Files:</p>
                  <ul className="list-disc list-inside">
                    {selectedFiles.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md disabled:opacity-50 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
              disabled={loading || selectedFiles.length === 0}
            >
              {loading ? "Processing..." : "Rank Resumes"}
            </button>
          </form>

          {message && (
            <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-md">
              {message}
            </div>
          )}
          {error && (
            <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-md">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeScanner;
