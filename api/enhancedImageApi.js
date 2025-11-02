// enhancedImageApi.js
import axios from "axios";

const API_KEY = "YOUR_API_KEY";
const BASE_URL = "https://techhk.aoscdn.com/";
const MAXIMUM_RETRIES = 20;

export const enhancedImageApi = async (file) => {
    try {
        const taskId = await uploadImage(file);
        console.log("Image uploaded successfully, Task ID:", taskId);
        const enhancedImageData = await PollForEnhancedImage(taskId);
        console.log("Enhanced Image Data:", enhancedImageData);
        return enhancedImageData;
    } catch (error) {
        console.error("Error enhancing image:", error);
        throw error;
    }
};

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image_file", file);

    try {
        const { data } = await axios.post(
            `${BASE_URL}/api/tasks/visual/scale`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-API-KEY": API_KEY
                },
            }
        );

        if (!data?.data?.task_id) {
            throw new Error("Failed to upload image! Task ID not found");
        }
        return data.data.task_id;
    } catch (error) {
        console.error("Error in uploadImage:", error);
        throw new Error(`Failed to upload image: ${error.message}`);
    }
};

const PollForEnhancedImage = async (taskId, retries = 0) => {
    try {
        const result = await fetchEnhancedImage(taskId);
        
        if (!result || !result.data) {
            throw new Error("Invalid response from server");
        }

        console.log(`Polling attempt ${retries + 1}/${MAXIMUM_RETRIES}`, result.data);

        if (result.data.state === 4) {
            // Still processing
            if (retries >= MAXIMUM_RETRIES) {
                throw new Error("Max retries reached. Please try again later.");
            }

            // Wait 2 seconds before polling again
            await new Promise(resolve => setTimeout(resolve, 2000));
            return PollForEnhancedImage(taskId, retries + 1);
        }

        // If state is not 4, return the result
        return result;

    } catch (error) {
        console.error(`Error in PollForEnhancedImage (attempt ${retries + 1}):`, error);
        throw error;
    }
};

const fetchEnhancedImage = async (taskId) => {
    try {
        const { data } = await axios.get(
            `${BASE_URL}/api/tasks/visual/scale/${taskId}`,
            {
                headers: {
                    "X-API-KEY": API_KEY
                },
            }
        );

        if (!data) {
            throw new Error("No data received from server");
        }

        return data;
    } catch (error) {
        console.error("Error in fetchEnhancedImage:", error);
        throw new Error(`Failed to fetch enhanced image: ${error.message}`);
    }
};