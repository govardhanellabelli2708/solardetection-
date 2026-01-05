import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { AnalysisResults } from './components/AnalysisResults';
import { Sidebar } from './components/Sidebar';
import { analyzeImage } from './services/geminiService';
import { AnalysisResult } from './types';
import { Loader2, AlertCircle } from 'lucide-react';

// Helper to resize image to prevent large payloads
const resizeImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_WIDTH = 1024;
        const MAX_HEIGHT = 1024;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        // Compress to JPEG 0.8 quality
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = (error) => reject(new Error("Failed to load image for resizing"));
    };
    reader.onerror = (error) => reject(new Error("Failed to read file"));
  });
};

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (file: File) => {
    try {
      // Resize image before setting state to ensure API payload is manageable
      const resizedBase64 = await resizeImage(file);
      setImage(resizedBase64);
      setResult(null);
      setError(null);
    } catch (err) {
      console.error("Image processing error:", err);
      setError("Failed to process image. Please try another file.");
    }
  }, []);

  const handleAnalyze = async () => {
    if (!image) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // Extract mime type and base64 data
      // data:image/jpeg;base64,....
      const matches = image.match(/^data:(.+);base64,(.+)$/);
      
      if (!matches || matches.length !== 3) {
        throw new Error("Invalid image format");
      }

      const mimeType = matches[1];
      const base64Data = matches[2];

      const data = await analyzeImage(base64Data, mimeType);
      setResult(data);
    } catch (err: any) {
      console.error("Analysis Error:", err);
      let errorMessage = "Failed to analyze image.";
      
      // Handle specific error cases if possible
      if (err.message?.includes("xhr error") || err.message?.includes("Rpc failed")) {
        errorMessage = "Network error: The image might be too large or the API connection failed. Retrying with a different image might help.";
      } else if (err.message) {
        errorMessage = `Error: ${err.message}`;
      }
      
      setError(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 gap-6 grid grid-cols-1 lg:grid-cols-3">
        
        {/* Left Column: Input and Results */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Card */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-500 rounded-full inline-block"></span>
              Image Analysis
            </h2>
            
            {!image ? (
              <ImageUploader onImageUpload={handleImageUpload} />
            ) : (
              <div className="space-y-6">
                <div className="relative rounded-lg overflow-hidden border border-slate-600 bg-black/40 aspect-video flex items-center justify-center">
                  <img 
                    src={image} 
                    alt="Uploaded EL" 
                    className="max-h-full max-w-full object-contain"
                  />
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10 backdrop-blur-sm">
                      <Loader2 className="w-12 h-12 text-blue-400 animate-spin mb-4" />
                      <p className="text-blue-100 font-medium animate-pulse">Analyzing solar cell structure...</p>
                    </div>
                  )}
                </div>

                {!result && !isAnalyzing && (
                  <div className="flex gap-4">
                    <button
                      onClick={handleAnalyze}
                      className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95"
                    >
                      Analyze Defect
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-900/20 border border-red-800 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-red-200">{error}</p>
              </div>
            )}
          </div>

          {/* Results Section */}
          {result && <AnalysisResults result={result} onReset={handleReset} />}
          
        </div>

        {/* Right Column: Info & Stats */}
        <div className="lg:col-span-1">
          <Sidebar />
        </div>

      </main>
    </div>
  );
}