import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function ImageUpload({ onResult }) {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState("none");

    const handleFile = (selectedFile) => {
        if (!selectedFile.type.startsWith("image/")) {
            toast.error("Please upload an image");
            return;
        }
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
    };

    const handleSubmit = async () => {
        if (!file) {
            toast.error("Upload an image first");
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("preprocess_mode", mode);

            const res = await axios.post(
                "http://localhost:8000/ocr",
                formData
            );

            onResult(res.data.text, res.data.confidence);
            toast.success("Text extracted!");
        } catch {
            toast.error("Failed to extract text");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full p-3 rounded-xl border bg-white
               text-sm text-gray-700
               focus:ring-2 focus:ring-indigo-400
               cursor-pointer shadow-sm hover:shadow-md transition"
            >
                <option value="none">No preprocessing</option>
                <option value="grayscale">Grayscale</option>
                <option value="threshold">High contrast</option>
                <option value="denoise">Denoise</option>
            </select>
            {/* Upload Box */}
            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="group border-2 border-dashed border-indigo-300 rounded-2xl p-6 text-center
                   bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-500
                   transition-all duration-200 cursor-pointer focus-within:ring-2 focus-within:ring-indigo-400"
                onClick={() => document.getElementById("fileInput").click()}
            >
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleFile(e.target.files[0])}
                />

                {preview ? (
                    <img
                        src={preview}
                        alt="preview"
                        className="mx-auto max-h-52 rounded-xl shadow-lg border border-gray-200 transition-transform duration-200 hover:scale-[1.01]"
                    />
                ) : (
                    <div className="flex flex-col items-center gap-3 pointer-events-none">
                        <div className="
        h-14 w-14
        flex items-center justify-center
        rounded-full
        bg-indigo-100
        text-indigo-600
        text-xl
        group-hover:scale-110
        transition-transform
    ">
                            📷
                        </div>

                        <p className="text-gray-700 font-medium">
                            Drag & drop an image here
                        </p>

                        <p className="text-sm text-gray-500">
                            or <span className="text-indigo-600 font-semibold">click to upload</span>
                        </p>
                    </div>
                )}
            </div>

            {/* Extract Button */}
            <div className="relative">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full py-3 rounded-xl font-semibold flex justify-center items-center gap-2
        ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                        }
        transition-all text-white`}
                >
                    {loading ? "Extracting..." : "Extract Text"}
                </button>
            </div>
        </div>
    );
}
