import React, { useState } from 'react';
import './App.css';
import { analyzeImage } from './azure-image-analysis.js';
import { generateImage } from './azure-image-generation.js';

// import { isConfigured as isGenerationConfigured } from './azure-image-generation';
// import { isConfigured as isAnalysisConfigured } from './azure-image-analysis';

function App() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // const configured = isGenerationConfigured() && isAnalysisConfigured();

  //   if (!configured) {
  //       // Render warning message if not configured
  //       return (
  //           <div className="App">
  //               <header className="App-header">
  //                   <h1>Configuration Error</h1>
  //                   <p>Please ensure that Azure AI services are properly configured.</p>
  //               </header>
  //           </div>
  //       );
  //   }
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleAnalyzeClick = async () => {
  console.log('Analyze button clicked with input:', input);
  setLoading(true);
  try {
    const analysisResults = await analyzeImage(input);
    setResults(analysisResults);
  } catch (error) {
    console.error('Failed to analyze image:', error);
    setResults({ error: 'Failed to analyze image. Please try again.' });
  }
  setLoading(false);
  }
  const handleGenerateClick = async () => {
    console.log('Generate button clicked with input:', input);
    setLoading(true);
    try {
      const data = await generateImage(input);  // Changed prompt to input
      setResults(data);
    } catch (error) {
      console.error('Failed to generate completion:', error);
      setResults({ error: 'Failed to generate completion. Please try again.' });
    }
    setLoading(false);
  };

const DisplayResults = () => {
  // Check if results are not available or contain an error
  if (!results) return <div>No results or waiting for input...</div>;
  if (results.error) return <div>Error: {results.error}</div>;

  // Extract the URL from the results if available
  const imageUrl = results.data && results.data.length > 0 ? results.data[0].url : null;

  // Render the results
  return (
    <div>
      <h3>Results:</h3>
      {imageUrl && <img src={imageUrl} alt="Generated Content" />}
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
};

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Analysis and Generation</h1>
      </header>
      <main>
        <input
          type="text"
          placeholder="Enter image URL or prompt"
          value={input}
          onChange={handleInputChange}
        />
        <div className="button-group">
          <button onClick={handleAnalyzeClick} disabled={loading}>{loading ? 'Analyzing...' : 'Analyze Image'}</button>
          <button onClick={handleGenerateClick} disabled={loading}>{loading ? 'Loading...' : 'Generate'}</button>
        </div>
        <DisplayResults />  {/* Display the results here */}
      </main>
    </div>
  );
}

export default App;
