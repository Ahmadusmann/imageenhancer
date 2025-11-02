// Home.jsx
import { useState } from "react";
import ImageUpload from "./ImageUpload";
import ImagePreview from "./ImagePreview";
import { enhancedImageApi } from "../api/enhancedImageApi";

const Home = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [enhancedImage, setEnhancedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const handleUpload = async (file) => {
        setUploadedImage(URL.createObjectURL(file));
        setLoading(true);
        setError(null);

        try {
            const enhancedImageData = await enhancedImageApi(file);
            if (enhancedImageData?.data?.image) {
                setEnhancedImage(enhancedImageData.data.image);
            } else {
                throw new Error("Invalid response format from server");
            }
        } catch (err) {
            console.error("Error in handleUpload:", err);
            setError(err.message || "Failed to enhance image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Image Enhancer</h1>

            <ImageUpload onUpload={handleUpload} />

            {error && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <ImagePreview
                uploaded={uploadedImage}
                enhanced={enhancedImage}
                loading={loading}
            />
        </div>
    );
};

export default Home;