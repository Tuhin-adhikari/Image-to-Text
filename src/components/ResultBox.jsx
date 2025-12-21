import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function ResultBox({ text, confidence }) {
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height =
                textareaRef.current.scrollHeight + "px";
        }
    }, [text]);

    if (!text || text.trim().length === 0) {
        return (
            <div className="mt-6 text-center text-sm text-gray-400">
                Upload an image and extract text to see results here
            </div>
        );
    }

    const copyText = async () => {
        await navigator.clipboard.writeText(text);
        toast.success("Text copied!");
    };

    const downloadText = () => {
        const element = document.createElement("a");
        const file = new Blob([text], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = "extracted_text.txt";
        document.body.appendChild(element);
        element.click();
    };

    // confidence color logic
    const confidenceColor =
        confidence >= 80
            ? "text-green-600"
            : confidence >= 50
                ? "text-yellow-600"
                : "text-red-500";

    return (
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white/70 backdrop-blur shadow-lg overflow-hidden">
            <div className="flex justify-between items-center px-4 py-3 border-b">
                <div>
                    <h2 className="font-semibold text-gray-700">
                        Extracted Text
                    </h2>
                    {confidence !== null && (
                        <div className="px-4 py-2">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>OCR Confidence</span>
                                <span>{confidence}%</span>
                            </div>

                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500
                   transition-all duration-700"
                                    style={{ width: `${confidence}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={copyText}
                    className="text-xs font-medium bg-indigo-600 text-white px-3 py-1.5 rounded-lg
                               hover:bg-indigo-700 transition-all active:scale-95"
                >
                    Copy
                </button>
                <button
                    onClick={downloadText}
                    className="text-xs font-medium bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition active:scale-95"
                >
                    Download
                </button>
            </div>

            <textarea
                ref={textareaRef}
                value={text}
                readOnly
                className="w-full p-4 bg-transparent text-gray-800 resize-none outline-none
                           rounded-b-2xl overflow-y-auto max-h-[320px] leading-relaxed"
            />
        </div>
    );
}
