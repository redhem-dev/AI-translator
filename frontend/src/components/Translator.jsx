import React, { useState } from "react";
import axios from 'axios';

const Translator = () => {
  const [formData, setFormData] = useState({
    context: '',
    reqLanguage: '',
    resLanguage: '',
    textToBeTranslated: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState(null);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
    
      console.log(formData)  ;
      const response = await axios.post("http://localhost:3000/translation", formData);
      if (response.data && response.data.translated_text) {
        console.log(response);
        setResults(response.data);
      } else {
        throw new Error("Invalid response format from the API");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Translator Application</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Context</label>
              <input
                type="text"
                name="context"
                value={formData.context}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter context"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">From Language</label>
              <input
                type="text"
                name="reqLanguage"
                value={formData.reqLanguage}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter source language"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">To Language</label>
              <input
                type="text"
                name="resLanguage"
                value={formData.resLanguage}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter target language"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Text to Translate</label>
              <textarea
                value={formData.textToBeTranslated}
                name="textToBeTranslated"
                onChange={handleChange}
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter text to translate"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {isLoading ? "Translating..." : "Translate"}
            </button>
          </form>

          {/* Right Side: API Response */}
          <div>
          <h2 className="text-xl font-semibold mb-4">Translated Text</h2>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              {error ? (
                <p className="text-red-500">{error}</p>
              ) : results ? (
                <pre className="text-gray-700 whitespace-pre-wrap">
                  {results.translated_text}
                </pre>
              ) : (
                <p className="text-gray-500">Your translated text will appear here...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translator;