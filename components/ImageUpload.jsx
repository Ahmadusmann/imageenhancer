// ImageUpload.jsx
import React, { useRef } from "react";

const ImageUpload = ({ onUpload }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Check file type
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            alert('Please select a valid image file (JPEG, PNG, or WebP)');
            return;
        }

        // Check file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            return;
        }

        onUpload(file);
    };

    return (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
            <label 
                htmlFor="fileInput"
                className="block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors"
            >
                <input 
                    ref={fileInputRef}
                    type="file" 
                    id="fileInput" 
                    accept="image/jpeg, image/png, image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <div className="space-y-2">
                    <svg 
                        className="mx-auto h-12 w-12 text-gray-400" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                        />
                    </svg>
                    <p className="text-lg font-medium text-gray-600">
                        Click to upload your image
                    </p>
                    <p className="text-sm text-gray-500">
                        PNG, JPG, or WebP (max 5MB)
                    </p>
                </div>
            </label>
        </div>
    );
};

export default ImageUpload;