import React from "react";
import "./index.css"
import "./App.css"
import Home from "./components/Home";

const App = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-10 py-8 px-4">
            
            <div className="text-center mb-8">
                <h1 className="text-5xl font-bold text-gray-800 mb-2">AI Image Enhancer</h1>
                <p className="text-lg text-gray-600 mt-2">Upload your Image and let AI enchancer it in seconds!</p>
            </div>

            <Home />
            
             <div className="text-sm text-gray-500 mt-6">
                Powered by @WelaCoder
            </div>
        </div>
    );
};

export default App;