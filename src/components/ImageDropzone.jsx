import { useState } from "react";

export default function ImageDropzone({ onFileSelect }) {
    const [preview, setPreview] = useState(null);

    const handleFile = (file) => {
        setPreview(URL.createObjectURL(file));
        onFileSelect(file);
    };

    return (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 transition">
            <input
                type="file"
                accept="image/*"
                className="hidden"
                id="fileInput"
                onChange={(e) => handleFile(e.target.files[0])}
            />

            <label htmlFor="fileInput" className="cursor-pointer">
                {preview ? (
                    <img
                        src={preview}
                        alt="Preview"
                        className="mx-auto max-h-48 rounded-lg"
                    />
                ) : (
                    <p className="text-gray-500">
                        Click or drag an image here
                    </p>
                )}
            </label>
        </div>
    );
}
