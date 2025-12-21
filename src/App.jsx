import { useState } from "react";
import ResultBox from "./components/ResultBox";
import ImageUpload from "./components/ImageUpload";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
    const [text, setText] = useState("");
    const [confidence, setConfidence] = useState(null);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
            <Toaster position="top-right" />

            <div className="
        w-full max-w-2xl
        bg-white/90 backdrop-blur
        rounded-3xl
        shadow-2xl
        p-6 sm:p-8
        border border-white/50
        max-h-[90vh] overflow-y-auto
    ">
                <h1 className="text-3xl font-extrabold text-center mb-2 text-gray-800">
                    Image to Text Extractor
                </h1>

                <p className="text-center text-sm text-gray-500 mb-6">
                    Upload an image and instantly extract readable text
                </p>

                <ImageUpload
                    onResult={(extractedText, extractedConfidence) => {
                        setText(extractedText);
                        setConfidence(extractedConfidence);
                    }}
                />
                <ResultBox text={text} confidence={confidence} />
                {text && (
                    <button
                        onClick={() => {
                            setText("");
                            setConfidence(null);
                        }}
                        className="mt-4 w-full text-sm text-gray-500 hover:text-red-500
             transition cursor-pointer"
                    >
                        Clear result
                    </button>
                )}
            </div>
        </div>
    );
}

export default App;